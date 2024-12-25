const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationToken');

// POST /payment/checkout
router.post('/checkout', authenticateToken, (req, res) => {
    res.send('Process payment checkout');
});

// GET /payment/status/:orderId
router.get('/status/:orderId', authenticateToken, (req, res) => {
    res.send(`Get payment status for order ID: ${req.params.orderId}`);
});

module.exports = router;
