const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationToken');
const isAdmin = require('../middleware/isAdmin');

// GET /users
router.get('/', authenticateToken, isAdmin, (req, res) => {
    res.send('Get all users');
});

// GET /users/:id
router.get('/:id', authenticateToken, (req, res) => {
    res.send(`Get user by ID: ${req.params.id}`);
});

// PUT /users/:id
router.put('/:id', authenticateToken, (req, res) => {
    res.send(`Update user by ID: ${req.params.id}`);
});

// DELETE /users/:id
router.delete('/:id', authenticateToken, isAdmin, (req, res) => {
    res.send(`Delete user by ID: ${req.params.id}`);
});

module.exports = router;
