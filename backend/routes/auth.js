const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model
const authenticateToken = require('../middleware/authenticationToken');
const isGuest = require('../middleware/isGuest');
const router = express.Router();

// POST /auth/login
router.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful.', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// POST /auth/register
router.post('/register', isGuest, async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Registration successful. Please log in.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// POST /auth/logout
router.post('/logout', authenticateToken, (req, res) => {
    // Logout is typically handled on the client side by deleting the token
    res.status(200).json({ message: 'Logout successful.' });
});

// GET /auth/profile
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        // Fetch the profile of the currently logged-in user
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});


module.exports = router;
