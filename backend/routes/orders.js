const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authenticateToken = require('../middleware/authenticationToken');
const isAdmin = require('../middleware/isAdmin');
const { v4: uuidv4 } = require('uuid'); // For generating unique tracking IDs
const logger = require('../utils/logger'); // Import custom logger

// POST /orders - Create a new order
router.post('/', authenticateToken, async (req, res) => {
    const { lineItems, shippingAddress, billingAddress, totalAmount, notes } = req.body;

    // Validate required fields
    if (!lineItems || !shippingAddress || !billingAddress || !totalAmount) {
        logger.warning('Order creation failed due to missing fields', { userId: req.user.id });
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
        logger.success('Order created successfully', { orderId: newOrder._id, userId: req.user.id });
        res.status(201).json({ message: 'Order created successfully.', order: newOrder });
    } catch (err) {
        logger.error('Error creating order', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// GET /orders - Retrieve all orders (admin-only)
router.get('/', authenticateToken, isAdmin, async (req, res) => {
    try {
        logger.action('Fetching all orders');
        const orders = await Order.find().populate('user', 'name email');
        logger.log('Orders retrieved successfully', { count: orders.length });
        res.status(200).json({ orders });
    } catch (err) {
        logger.error('Error retrieving orders', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// GET /orders/user/:userId - Retrieve all orders for a specific user
router.get('/user/:userId', authenticateToken, async (req, res) => {
    try {
        if (req.user.id !== req.params.userId && req.user.role !== 'admin') {
            logger.warning('Unauthorized access to user orders', { userId: req.user.id, targetUserId: req.params.userId });
            return res.status(403).json({ error: 'Access denied.' });
        }

        logger.action('Fetching orders for a specific user', { userId: req.params.userId });
        const orders = await Order.find({ user: req.params.userId });
        logger.log('User orders retrieved successfully', { userId: req.params.userId, count: orders.length });
        res.status(200).json({ orders });
    } catch (err) {
        logger.error('Error retrieving user orders', { userId: req.params.userId, error: err });
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// GET /orders/:id - Retrieve a specific order by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        logger.action('Fetching order by ID', { orderId: req.params.id });
        const order = await Order.findById(req.params.id);

        if (!order) {
            logger.warning('Order not found', { orderId: req.params.id });
            return res.status(404).json({ error: 'Order not found.' });
        }

        if (req.user.id !== order.user.toString() && req.user.role !== 'admin') {
            logger.warning('Unauthorized access to order', { userId: req.user.id, orderId: req.params.id });
            return res.status(403).json({ error: 'Access denied.' });
        }

        logger.log('Order retrieved successfully', { order });
        res.status(200).json({ order });
    } catch (err) {
        logger.error('Error retrieving order', { orderId: req.params.id, error: err });
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// PUT /orders/:id - Update an order (admin-only)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
    const { status, notes } = req.body;

    try {
        logger.action('Updating order', { orderId: req.params.id });
        const order = await Order.findById(req.params.id);

        if (!order) {
            logger.warning('Order not found for update', { orderId: req.params.id });
            return res.status(404).json({ error: 'Order not found.' });
        }

        if (status) order.status = status; // Update order status
        if (notes) order.notes = notes; // Add or update notes
        order.updatedAt = Date.now(); // Update the timestamp
        await order.save();

        logger.success('Order updated successfully', { orderId: req.params.id });
        res.status(200).json({ message: 'Order updated successfully.', order });
    } catch (err) {
        logger.error('Error updating order', { orderId: req.params.id, error: err });
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// GET /orders/track/:trackingId - Track an order
router.get('/track/:trackingId', async (req, res) => {
    try {
        logger.action('Tracking order by tracking ID', { trackingId: req.params.trackingId });
        const order = await Order.findOne({ trackingId: req.params.trackingId });

        if (!order) {
            logger.warning('Order not found for tracking', { trackingId: req.params.trackingId });
            return res.status(404).json({ error: 'Order not found.' });
        }

        logger.log('Order tracking data retrieved successfully', { trackingId: order.trackingId });
        res.status(200).json({
            trackingId: order.trackingId,
            status: order.status,
            updatedAt: order.updatedAt,
        });
    } catch (err) {
        logger.error('Error tracking order', { trackingId: req.params.trackingId, error: err });
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
