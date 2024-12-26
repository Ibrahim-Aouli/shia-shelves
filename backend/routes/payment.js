const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

// POST /payment/checkout - Create a Stripe checkout session
router.post('/checkout', async (req, res) => {
    const { orderId } = req.body;

    if (!orderId) {
        return res.status(400).json({ error: 'Order ID is required.' });
    }

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ error: 'Order not found.' });
        }

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

        res.status(200).json({ sessionId: session.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// GET /payment/status/:orderId - Check payment status
router.get('/status/:orderId', async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ error: 'Order not found.' });
        }

        // Assuming `paymentStatus` is stored in the order model
        res.status(200).json({ paymentStatus: order.paymentStatus || 'pending' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// POST /payment/mock-checkout - Mock payment checkout session
router.post('/mock-checkout', async (req, res) => {
    const { orderId } = req.body;

    if (!orderId) {
        return res.status(400).json({ error: 'Order ID is required.' });
    }

    try {
        // Simulate finding the order in the database
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ error: 'Order not found.' });
        }

        // Simulate creating a checkout session
        const sessionId = `mock-session-${Math.random().toString(36).substring(2, 15)}`;

        res.status(200).json({
            message: 'Mock checkout session created successfully.',
            sessionId,
            redirectUrl: `${process.env.CLIENT_URL}/mock-payment?sessionId=${sessionId}&orderId=${order.id}`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// POST /payment/mock-complete - Mock payment completion
router.post('/mock-complete', async (req, res) => {
    const { sessionId, orderId, status } = req.body;

    if (!sessionId || !orderId || !status) {
        return res.status(400).json({ error: 'Session ID, Order ID, and status are required.' });
    }

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ error: 'Order not found.' });
        }

        // Update order's payment status based on the mock status
        order.paymentStatus = status; // e.g., 'paid', 'failed'
        await order.save();

        res.status(200).json({
            message: `Mock payment marked as ${status}.`,
            order
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});


module.exports = router;
