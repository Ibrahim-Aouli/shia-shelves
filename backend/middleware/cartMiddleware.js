const Cart = require('../models/Cart');
const logger = require('../utils/logger'); // Importing custom logger

/**
 * Middleware to initialize or retrieve the cart.
 * - For authenticated users, fetch or create their cart in the database.
 * - For guest users, manage a session-based cart.
 */
const cartMiddleware = async (req, res, next) => {
    try {
        if (req.user) {
            // Authenticated user: Load their cart from the database
            logger.action('Fetching cart for authenticated user', { userId: req.user.id });

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
        } else {
            // Guest user: Use session-based cart
            logger.action('Fetching cart for guest user');

            if (!req.session.cart) {
                // Initialize a new cart in the session if none exists
                logger.log('No session cart found, initializing a new one');
                req.session.cart = { items: [], totalAmount: 0 };
            }

            logger.log('Session cart retrieved or initialized', { cart: req.session.cart });

            // Attach the session cart to the request object
            req.cart = req.session.cart;
        }

        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        // Log the error and respond with a 500 status
        logger.error('Error in cart middleware', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = cartMiddleware;
