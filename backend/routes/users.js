const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken');
const isAdmin = require('../middleware/isAdmin');

// GET /users - Fetch all users (admin-only)
router.get('/', authenticateToken, isAdmin, async (req, res) => {
    try {
        const users = await User.find().select('-passwordHash'); // Exclude sensitive data
        res.status(200).json({ users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// GET /users/:id - Fetch a specific user's details
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-passwordHash');
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Only allow access to the user themselves or an admin
        if (req.user.id !== req.params.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied.' });
        }

        res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// PUT /users/:id - Update a user's details
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Only allow updates by the user themselves or an admin
        if (req.user.id !== req.params.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied.' });
        }

        // Update user fields dynamically
        const updates = req.body;
        Object.keys(updates).forEach(key => {
            if (key !== 'passwordHash') user[key] = updates[key]; // Prevent direct password updates
        });

        await user.save();
        res.status(200).json({ message: 'User updated successfully.', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// DELETE /users/:id - Delete a user account (admin-only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        await user.deleteOne();
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
