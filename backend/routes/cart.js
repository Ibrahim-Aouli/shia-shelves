const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationToken');

// POST /cart
router.post('/', authenticateToken, (req, res) => {
    res.send('Add item to cart');
});

// GET /cart
router.get('/', authenticateToken, (req, res) => {
    res.send('Get cart items');
});

// PUT /cart/:itemId
router.put('/:itemId', authenticateToken, (req, res) => {
    res.send(`Update item in cart: ${req.params.itemId}`);
});

// DELETE /cart/:itemId
router.delete('/:itemId', authenticateToken, (req, res) => {
    res.send(`Remove item from cart: ${req.params.itemId}`);
});

// DELETE /cart
router.delete('/', authenticateToken, (req, res) => {
    res.send('Clear cart');
});

module.exports = router;
