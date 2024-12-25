const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationToken');
const isAdmin = require('../middleware/isAdmin');

// GET /categories
router.get('/', (req, res) => {
    res.send('Get all categories');
});

// GET /categories/:id
router.get('/:id', (req, res) => {
    res.send(`Get category by ID: ${req.params.id}`);
});

// POST /categories
router.post('/', authenticateToken, isAdmin, (req, res) => {
    res.send('Create new category');
});

// PUT /categories/:id
router.put('/:id', authenticateToken, isAdmin, (req, res) => {
    res.send(`Update category by ID: ${req.params.id}`);
});

// DELETE /categories/:id
router.delete('/:id', authenticateToken, isAdmin, (req, res) => {
    res.send(`Delete category by ID: ${req.params.id}`);
});

module.exports = router;
