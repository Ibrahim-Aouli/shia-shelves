const express = require('express');
const router = express.Router();
const cartMiddleware = require('../middleware/cartMiddleware');
const Cart = require('../models/Cart');

// POST /cart - Add an item to the cart
router.post('/', cartMiddleware, async (req, res) => {
    const { product, name, price, quantity } = req.body;

    if (!product || !name || !price || !quantity) {
        return res.status(400).json({ error: 'Product, name, price, and quantity are required.' });
    }

    try {
        const cart = req.cart;

        const existingItem = cart.items.find(item => item.product.toString() === product);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product, name, price, quantity });
        }

        cart.totalAmount = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

        if (req.user) {
            await cart.save(); // Save to database for authenticated users
        } else {
            req.session.cart = cart; // Update session cart for guests
        }

        res.status(200).json({ message: 'Item added to cart.', cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// GET /cart - Retrieve the current user's cart
router.get('/', cartMiddleware, async (req, res) => {
    try {
        const cart = req.cart;
        res.status(200).json({ cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// PUT /cart/:itemId - Update the quantity of a cart item
router.put('/:itemId', cartMiddleware, async (req, res) => {
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
        return res.status(400).json({ error: 'Quantity must be at least 1.' });
    }

    try {
        const cart = req.cart;
        const item = cart.items.find(item => item._id.toString() === req.params.itemId);

        if (!item) {
            return res.status(404).json({ error: 'Item not found in cart.' });
        }

        item.quantity = quantity;
        cart.totalAmount = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

        if (req.user) {
            await cart.save();
        } else {
            req.session.cart = cart;
        }

        res.status(200).json({ message: 'Cart item updated.', cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// DELETE /cart/:itemId - Remove an item from the cart
router.delete('/:itemId', cartMiddleware, async (req, res) => {
    try {
        const cart = req.cart;

        cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
        cart.totalAmount = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

        if (req.user) {
            await cart.save();
        } else {
            req.session.cart = cart;
        }

        res.status(200).json({ message: 'Item removed from cart.', cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// DELETE /cart - Clear the entire cart
router.delete('/', cartMiddleware, async (req, res) => {
    try {
        const cart = req.cart;

        cart.items = [];
        cart.totalAmount = 0;

        if (req.user) {
            await cart.save();
        } else {
            req.session.cart = cart;
        }

        res.status(200).json({ message: 'Cart cleared.', cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
