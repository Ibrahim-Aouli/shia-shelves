const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const logger = require('../utils/logger'); // Import custom logger

// POST /payment/checkout - Create a Stripe checkout session
router.post('/checkout', async (req, res) => {
    const { orderId } = req.body;

    if (!orderId) {
        logger.warning('Checkout failed due to missing order ID');
        return res.status(400).json({ error: 'Order ID is required.' });
    }

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            logger.warning('Checkout failed because order not found', { orderId });
            return res.status(404).json({ error: 'Order not found.' });
        }

        logger.action('Creating Stripe checkout session', { orderId });
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'au_becs_debit', 'afterpay_clearpay'], // Add supported methods
            line_items: order.lineItems.map(item => ({
                price_data: {
                    currency: 'aud', // Currency set to AUD
                    product_data: {
                        name: item.name
                    },
                    unit_amount: item.price * 100 // Amount in cents
                },
                quantity: item.quantity
            })),
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/success?orderId=${order.id}`,
            cancel_url: `${process.env.CLIENT_URL}/cancel?orderId=${order.id}`
        });

        logger.success('Stripe checkout session created successfully', { sessionId: session.id });
        res.status(200).json({ sessionId: session.id });
    } catch (err) {
        logger.error('Error creating Stripe checkout session', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// GET /payment/status/:orderId - Check payment status
router.get('/status/:orderId', async (req, res) => {
    const { orderId } = req.params;

    try {
        logger.action('Checking payment status', { orderId });
        const order = await Order.findById(orderId);

        if (!order) {
            logger.warning('Payment status check failed because order not found', { orderId });
            return res.status(404).json({ error: 'Order not found.' });
        }

        logger.log('Payment status retrieved successfully', { orderId, paymentStatus: order.paymentStatus || 'pending' });
        res.status(200).json({ paymentStatus: order.paymentStatus || 'pending' });
    } catch (err) {
        logger.error('Error checking payment status', { orderId, error: err });
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// POST /payment/mock-checkout - Mock payment checkout session
router.post('/mock-checkout', async (req, res) => {
    const { orderId } = req.body;

    if (!orderId) {
        logger.warning('Mock checkout failed due to missing order ID');
        return res.status(400).json({ error: 'Order ID is required.' });
    }

    try {
        logger.action('Creating mock checkout session', { orderId });
        const order = await Order.findById(orderId);

        if (!order) {
            logger.warning('Mock checkout failed because order not found', { orderId });
            return res.status(404).json({ error: 'Order not found.' });
        }

        const sessionId = `mock-session-${Math.random().toString(36).substring(2, 15)}`;
        logger.success('Mock checkout session created successfully', { sessionId });

        res.status(200).json({
            message: 'Mock checkout session created successfully.',
            sessionId,
            redirectUrl: `${process.env.CLIENT_URL}/mock-payment?sessionId=${sessionId}&orderId=${order.id}`
        });
    } catch (err) {
        logger.error('Error creating mock checkout session', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// POST /payment/mock-complete - Mock payment completion
router.post('/mock-complete', async (req, res) => {
    const { sessionId, orderId, status } = req.body;

    if (!sessionId || !orderId || !status) {
        logger.warning('Mock payment completion failed due to missing fields', { sessionId, orderId, status });
        return res.status(400).json({ error: 'Session ID, Order ID, and status are required.' });
    }

    try {
        logger.action('Completing mock payment', { sessionId, orderId, status });
        const order = await Order.findById(orderId);

        if (!order) {
            logger.warning('Mock payment completion failed because order not found', { orderId });
            return res.status(404).json({ error: 'Order not found.' });
        }

        order.paymentStatus = status; // e.g., 'paid', 'failed'
        await order.save();

        logger.success(`Mock payment marked as ${status}`, { orderId, status });
        res.status(200).json({
            message: `Mock payment marked as ${status}.`,
            order
        });
    } catch (err) {
        logger.error('Error completing mock payment', { sessionId, orderId, error: err });
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
