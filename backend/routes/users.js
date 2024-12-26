const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticationToken');
const isAdmin = require('../middleware/isAdmin');
const logger = require('../utils/logger'); // Import custom logger

// GET /users - Fetch all users (admin-only)
router.get('/', authenticateToken, isAdmin, async (req, res) => {
    try {
        logger.action('Fetching all users');
        const users = await User.find().select('-passwordHash'); // Exclude sensitive data
        logger.success('Users fetched successfully', { count: users.length });
        res.status(200).json({ users });
    } catch (err) {
        logger.error('Error fetching users', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// GET /users/:id - Fetch a specific user's details
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        logger.action('Fetching user by ID', { userId: req.params.id });
        const user = await User.findById(req.params.id).select('-passwordHash');
        if (!user) {
            logger.warning('User not found', { userId: req.params.id });
            return res.status(404).json({ error: 'User not found.' });
        }

        // Only allow access to the user themselves or an admin
        if (req.user.id !== req.params.id && req.user.role !== 'admin') {
            logger.warning('Unauthorized access attempt to user details', { requesterId: req.user.id, targetUserId: req.params.id });
            return res.status(403).json({ error: 'Access denied.' });
        }

        logger.log('User details fetched successfully', { userId: req.params.id });
        res.status(200).json({ user });
    } catch (err) {
        logger.error('Error fetching user details', { userId: req.params.id, error: err });
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// PUT /users/:id - Update a user's details
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        logger.action('Updating user details', { userId: req.params.id, updates: req.body });
        const user = await User.findById(req.params.id);
        if (!user) {
            logger.warning('User not found for update', { userId: req.params.id });
            return res.status(404).json({ error: 'User not found.' });
        }

        // Only allow updates by the user themselves or an admin
        if (req.user.id !== req.params.id && req.user.role !== 'admin') {
            logger.warning('Unauthorized update attempt on user details', { requesterId: req.user.id, targetUserId: req.params.id });
            return res.status(403).json({ error: 'Access denied.' });
        }

        // Update user fields dynamically
        const updates = req.body;
        Object.keys(updates).forEach(key => {
            if (key !== 'passwordHash') user[key] = updates[key]; // Prevent direct password updates
        });

        await user.save();
        logger.success('User details updated successfully', { userId: req.params.id });
        res.status(200).json({ message: 'User updated successfully.', user });
    } catch (err) {
        logger.error('Error updating user details', { userId: req.params.id, error: err });
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// DELETE /users/:id - Delete a user account (admin-only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        logger.action('Deleting user account', { userId: req.params.id });
        const user = await User.findById(req.params.id);
        if (!user) {
            logger.warning('User not found for deletion', { userId: req.params.id });
            return res.status(404).json({ error: 'User not found.' });
        }

        await user.deleteOne();
        logger.success('User account deleted successfully', { userId: req.params.id });
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (err) {
        logger.error('Error deleting user account', { userId: req.params.id, error: err });
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
