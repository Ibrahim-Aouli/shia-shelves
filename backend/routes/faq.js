const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationToken');
const isAdmin = require('../middleware/isAdmin');

// GET /faq
router.get('/', (req, res) => {
    res.send('Get all FAQs');
});

// GET /faq/:id
router.get('/:id', (req, res) => {
    res.send(`Get FAQ by ID: ${req.params.id}`);
});

// POST /faq
router.post('/', authenticateToken, isAdmin, (req, res) => {
    res.send('Create new FAQ');
});

// PUT /faq/:id
router.put('/:id', authenticateToken, isAdmin, (req, res) => {
    res.send(`Update FAQ by ID: ${req.params.id}`);
});

// DELETE /faq/:id
router.delete('/:id', authenticateToken, isAdmin, (req, res) => {
    res.send(`Delete FAQ by ID: ${req.params.id}`);
});

module.exports = router;
