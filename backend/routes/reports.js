const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationToken');
const isAdmin = require('../middleware/isAdmin');

// GET /reports/sales
router.get('/sales', authenticateToken, isAdmin, (req, res) => {
    res.send('Get sales reports');
});

// GET /reports/users
router.get('/users', authenticateToken, isAdmin, (req, res) => {
    res.send('Get user reports');
});

module.exports = router;
