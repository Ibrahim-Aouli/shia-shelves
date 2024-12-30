const express = require('express');
const router = express.Router();
const cartMiddleware = require('../middleware/cartMiddleware'); // Middleware to fetch or initialize the user's cart
const authenticateToken = require('../middleware/authenticationToken');
const Cart = require('../models/Cart'); // Cart model for database operations
const logger = require('../utils/logger'); // Custom logger for structured logging

// Cart routes can handle both authenticated and unauthenticated users
router.use((req, res, next) => {
    //try authenticating the user if a token exists
    if(req.header("Authorization")) {
        return authenticateToken(req, res, next);
    }

    next();
});

// POST /cart - Add an item to the cart
router.post('/', cartMiddleware, async (req, res) => {
    const { product, name, price, quantity } = req.body;

    // Validate required fields
    if (!product || typeof product !== 'string' || !name || typeof name !== 'string' || !price || isNaN(price) || !quantity || isNaN(quantity) || quantity < 1) {
        return res.status(400).json({ error: 'Invalid input for cart item.' });
    }
    

    try {
        logger.action('Adding item to cart', { product, name, price, quantity });
        const cart = req.cart;

        // Check if the item already exists in the cart
        const existingItem = cart.items.find(item => item.product.toString() === product);

        if (existingItem) {
            logger.log('Item already exists in cart, updating quantity', { existingItem });
            existingItem.quantity += quantity; // Update quantity for existing item
        } else {
            logger.log('Item does not exist in cart, adding new item');
            cart.items.push({ product, name, price, quantity }); // Add new item to cart
        }

        // Recalculate the total amount for the cart
        cart.totalAmount = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

        // Save the cart depending on user type
        if (req.user) {
            logger.log('Saving cart to database for authenticated user', { userId: req.user._id });
            await cart.save();
        } else {
            logger.log('Updating session cart for guest');
            req.session.cart = cart;
        }

        logger.success('Item added successfully', { cart });
        res.status(200).json({ message: 'Item added to cart.', cart });
    } catch (err) {
        logger.error('Error adding item to cart', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// GET /cart - Retrieve the current user's cart
router.get('/', cartMiddleware, async (req, res) => {
    try {
        logger.action('Fetching cart for user');
        const cart = req.cart;
        logger.success('Cart fetched successfully', { cart });
        res.status(200).json({ cart });
    } catch (err) {
        logger.error('Error fetching cart', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// PUT /cart/:itemId - Update the quantity of a cart item
router.put('/:itemId', cartMiddleware, async (req, res) => {
    const { quantity } = req.body;

    // Validate quantity
    if (!quantity || quantity < 1) {
        logger.log('Invalid quantity provided for cart update');
        return res.status(400).json({ error: 'Quantity must be at least 1.' });
    }

    try {
        logger.action('Updating cart item quantity', { itemId: req.params.itemId, quantity });
        const cart = req.cart;
        const item = cart.items.find(item => item._id.toString() === req.params.itemId);

        if (!item) {
            logger.log('Item not found in cart', { itemId: req.params.itemId });
            return res.status(404).json({ error: 'Item not found in cart.' });
        }

        // Update item quantity and recalculate the total
        item.quantity = quantity;
        cart.totalAmount = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

        if (req.user) {
            logger.log('Saving updated cart to database for authenticated user');
            await cart.save();
        } else {
            logger.log('Updating session cart for guest');
            req.session.cart = cart;
        }

        logger.success('Cart item updated successfully', { cart });
        res.status(200).json({ message: 'Cart item updated.', cart });
    } catch (err) {
        logger.error('Error updating cart item', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// DELETE /cart/:itemId - Remove an item from the cart
router.delete('/:itemId', cartMiddleware, async (req, res) => {
    try {
        logger.action('Removing item from cart', { itemId: req.params.itemId });
        const cart = req.cart;

        // Remove item and recalculate total
        cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
        cart.totalAmount = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

        if (req.user) {
            logger.log('Saving updated cart to database for authenticated user');
            await cart.save();
        } else {
            logger.log('Updating session cart for guest');
            req.session.cart = cart;
        }

        logger.success('Item removed from cart successfully', { cart });
        res.status(200).json({ message: 'Item removed from cart.', cart });
    } catch (err) {
        logger.error('Error removing item from cart', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// DELETE /cart - Clear the entire cart
router.delete('/', cartMiddleware, async (req, res) => {
    try {
        logger.action('Clearing entire cart');
        const cart = req.cart;

        // Clear all items and reset total
        cart.items = [];
        cart.totalAmount = 0;

        if (req.user) {
            logger.log('Saving cleared cart to database for authenticated user');
            await cart.save();
        } else {
            logger.log('Updating session cart for guest');
            req.session.cart = cart;
        }

        logger.success('Cart cleared successfully', { cart });
        res.status(200).json({ message: 'Cart cleared.', cart });
    } catch (err) {
        logger.error('Error clearing cart', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
