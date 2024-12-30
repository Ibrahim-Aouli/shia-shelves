const Cart = require('../models/Cart');
const logger = require('../utils/logger'); // Importing custom logger
const mongoose = require('mongoose');

/**
 * Middleware to initialize or retrieve the cart.
 * - For authenticated users, fetch or create their cart in the database.
 * - For guest users, manage a session-based cart.
 */
const cartMiddleware = async (req, res, next) => {
    try {
        // Check if session middleware is initialized
        if (!req.session) {
            logger.error('Session middleware not initialized');
            return res.status(500).json({ error: 'Session middleware not initialized' });
        }

        if (req.user) {
            // Authenticated user: Load their cart from the database
            logger.action('Fetching cart for authenticated user', { userId: req.user.id });

            try {
                let cart = await Cart.findOne({ user: req.user.id });

                if (!cart) {
                    // Create a new cart if none exists for the user
                    logger.log('No cart found for user, creating a new one', { userId: req.user.id });
                    cart = new Cart({ user: req.user.id, items: [], totalAmount: 0 });
                    await cart.save();
                    logger.log('New cart created for user', { cartId: cart._id });
                } else {
                    logger.log('Cart found for user', { cart });
                }

                // Attach the cart to the request object
                req.cart = cart;
            } catch (err) {
                logger.error('Error fetching cart from database. Fallback to an empty cart.', err);
                // Fallback to an empty cart in case of temporary issues
                req.cart = { items: [], totalAmount: 0 };
            }
        } else {
            // Guest user: Use session-based cart
            logger.action('Fetching cart for guest user');

            if (!req.session.cart) {
                // Initialize a new cart in the session if none exists
                logger.log('No session cart found, initializing a new one');
                req.session.cart = { items: [], totalAmount: 0 };
            }

            // Ensure session cart items have MongoDB-compatible IDs
            req.session.cart.items.forEach(item => {
                if (!item._id) item._id = new mongoose.Types.ObjectId().toString();
            });

            logger.log('Session cart retrieved or initialized', { cart: req.session.cart });

            // Attach the session cart to the request object
            req.cart = req.session.cart;
        }

        logger.success('Cart middleware executed successfully', { userType: req.user ? 'authenticated' : 'guest' });
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        // Log the error and respond with a 500 status
        logger.error('Unexpected error in cart middleware', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = cartMiddleware;
