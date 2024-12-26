const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authenticateToken = require('../middleware/authenticationToken');
const isAdmin = require('../middleware/isAdmin');
const { v4: uuidv4 } = require('uuid'); // For generating unique tracking IDs

// POST /orders - Create a new order
router.post('/', authenticateToken, async (req, res) => {
    const { lineItems, shippingAddress, billingAddress, totalAmount, notes } = req.body;

    // Validate required fields
    if (!lineItems || !shippingAddress || !billingAddress || !totalAmount) {
        return res.status(400).json({ error: 'Line items, shipping address, billing address, and total amount are required.' });
    }

    try {
        const newOrder = new Order({
            user: req.user.id,
            lineItems,
            shippingAddress,
            billingAddress,
            totalAmount,
            trackingId: uuidv4(), // Generate a unique tracking ID
            notes: notes || ''
        });

        await newOrder.save();

        res.status(201).json({ message: 'Order created successfully.', order: newOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// GET /orders - Retrieve all orders (admin-only)
router.get('/', authenticateToken, isAdmin, async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email'); // Populate user details
        res.status(200).json({ orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// GET /orders/user/:userId - Retrieve all orders for a specific user
router.get('/user/:userId', authenticateToken, async (req, res) => {
    try {
        if (req.user.id !== req.params.userId && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied.' });
        }

        const orders = await Order.find({ user: req.params.userId });
        res.status(200).json({ orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// GET /orders/:id - Retrieve a specific order by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found.' });
        }

        if (req.user.id !== order.user.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied.' });
        }

        res.status(200).json({ order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// PUT /orders/:id - Update an order (admin-only)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
    const { status, notes } = req.body;

    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found.' });
        }

        if (status) order.status = status; // Update order status
        if (notes) order.notes = notes; // Add or update notes
        order.updatedAt = Date.now(); // Update the timestamp
        await order.save();

        res.status(200).json({ message: 'Order updated successfully.', order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// GET /orders/track/:trackingId - Track an order
router.get('/track/:trackingId', async (req, res) => {
    try {
        const order = await Order.findOne({ trackingId: req.params.trackingId });
        if (!order) {
            return res.status(404).json({ error: 'Order not found.' });
        }

        res.status(200).json({
            trackingId: order.trackingId,
            status: order.status,
            updatedAt: order.updatedAt
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
