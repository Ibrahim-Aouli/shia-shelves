const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationToken');
const isGuest = require('../middleware/isGuest');

// POST /auth/login
router.post('/login', isGuest, (req, res) => {
    res.send('Login user');
});

// POST /auth/register
router.post('/register', isGuest, (req, res) => {
    res.send('Register user');
});

// POST /auth/logout
router.post('/logout', authenticateToken, (req, res) => {
    res.send('Logout user');
});

// GET /auth/profile
router.get('/profile', authenticateToken, (req, res) => {
    res.send('Get user profile');
});

module.exports = router;
