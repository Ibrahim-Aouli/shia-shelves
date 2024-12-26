const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticationToken');
const isGuest = require('../middleware/isGuest');
const mergeCarts = require('../utils/mergeCarts');
const logger = require('../utils/logger');
const router = express.Router();

// POST /auth/login
router.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        logger.warning('Missing email or password in login request');
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        logger.action('Fetching user by email', { email });
        const user = await User.findOne({ email });
        if (!user) {
            logger.warning('User not found during login', { email });
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        logger.action('Comparing passwords');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            logger.warning('Password mismatch during login', { email });
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        logger.action('Generating JWT token');
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Handle the cart if it exists
        if (req.session?.cart) {
            logger.action('Merging guest cart into user cart');
            const mergedCart = await mergeCarts(user._id, req.session.cart);
            logger.success('Cart merged successfully', { mergedCart });
            req.session.cart = null; // Clear session cart
        } else {
            logger.log('No cart found in session');
        }

        logger.success('Login successful', { userId: user._id });
        res.status(200).json({ message: 'Login successful.', token });
    } catch (err) {
        logger.error('Error during login', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// POST /auth/register
router.post('/register', isGuest, async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        logger.warning('Missing fields in registration request');
        return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    try {
        logger.action('Checking if user already exists', { email });
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            logger.warning('Email already registered during registration', { email });
            return res.status(400).json({ error: 'Email is already registered.' });
        }

        logger.action('Hashing password');
        const hashedPassword = await bcrypt.hash(password, 10);
        logger.action('Creating new user');
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        logger.success('Registration successful', { userId: newUser._id });
        res.status(201).json({ message: 'Registration successful. Please log in.' });
    } catch (err) {
        logger.error('Error during registration', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// POST /auth/logout
router.post('/logout', authenticateToken, (req, res) => {
    logger.success('User logged out successfully', { userId: req.user.id });
    res.status(200).json({ message: 'Logout successful.' });
});

// GET /auth/profile
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        logger.action('Fetching user profile', { userId: req.user.id });
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        if (!user) {
            logger.warning('User not found during profile fetch', { userId: req.user.id });
            return res.status(404).json({ error: 'User not found.' });
        }

        logger.success('Profile fetched successfully', { userId: user._id });
        res.status(200).json({ user });
    } catch (err) {
        logger.error('Error fetching profile', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
