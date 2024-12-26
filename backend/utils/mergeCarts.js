const Cart = require('../models/Cart');
const logger = require('../utils/logger'); // Importing custom logger

/**
 * Merges a session cart into a user's persisted cart.
 * @param {string} userId - The ID of the user.
 * @param {Object} sessionCart - The cart stored in the user's session.
 * @returns {Object} - The updated user cart.
 */
const mergeCarts = async (userId, sessionCart) => {
    try {
        logger.action('Fetching user cart for merging', { userId });

        // Fetch the user's persisted cart
        let userCart = await Cart.findOne({ user: userId });
        if (!userCart) {
            logger.log('No existing cart found for user, creating a new one', { userId });
            userCart = new Cart({ user: userId, items: [], totalAmount: 0 });
        } else {
            logger.log('Existing user cart found', { cart: userCart });
        }

        // Merge session cart items into user's persisted cart
        logger.action('Merging session cart into user cart', { sessionCart });
        sessionCart.items.forEach(sessionItem => {
            const existingItem = userCart.items.find(item => item.product.toString() === sessionItem.product);

            if (existingItem) {
                // Update quantity for existing item
                logger.log('Item already exists in user cart, updating quantity', { product: sessionItem.product });
                existingItem.quantity += sessionItem.quantity;
            } else {
                // Add new item to the user's cart
                logger.log('Item does not exist in user cart, adding new item', { product: sessionItem.product });
                userCart.items.push(sessionItem);
            }
        });

        // Recalculate the total amount for the user's cart
        userCart.totalAmount = userCart.items.reduce((total, item) => total + item.price * item.quantity, 0);
        logger.log('Recalculated cart total amount', { totalAmount: userCart.totalAmount });

        // Save the updated user cart to the database
        await userCart.save();
        logger.log('Updated user cart saved to database', { cartId: userCart._id });

        return userCart; // Return the updated user cart
    } catch (err) {
        logger.error('Error merging carts', err); // Log any errors encountered
        throw err; // Rethrow error to let the caller handle it
    }
};

module.exports = mergeCarts;
