const Cart = require('../models/Cart');

const mergeCarts = async (userId, sessionCart) => {
    // Fetch the user's persisted cart
    let userCart = await Cart.findOne({ user: userId });
    if (!userCart) {
        userCart = new Cart({ user: userId, items: [], totalAmount: 0 });
    }

    // Merge session cart items into user's persisted cart
    sessionCart.items.forEach(sessionItem => {
        const existingItem = userCart.items.find(item => item.product.toString() === sessionItem.product);
        if (existingItem) {
            existingItem.quantity += sessionItem.quantity;
        } else {
            userCart.items.push(sessionItem);
        }
    });

    // Recalculate total amount
    userCart.totalAmount = userCart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    // Save the updated cart
    await userCart.save();
    return userCart;
};

module.exports = mergeCarts;
