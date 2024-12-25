const Cart = require('../models/Cart');

// Middleware to initialize or retrieve cart
const cartMiddleware = async (req, res, next) => {
    if (req.user) {
        // Authenticated user: Load their cart from the database
        let cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            cart = new Cart({ user: req.user.id, items: [], totalAmount: 0 });
            await cart.save();
        }
        req.cart = cart; // Attach cart to the request object
    } else {
        // Guest user: Use session-based cart
        if (!req.session.cart) {
            req.session.cart = { items: [], totalAmount: 0 };
        }
        req.cart = req.session.cart; // Attach session cart to the request object
    }
    next();
};

module.exports = cartMiddleware;