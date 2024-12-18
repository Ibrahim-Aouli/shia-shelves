const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const { Product } = require("../models/Product");

// Add item to cart
router.post("/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Find the product
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    // Find the cart or create a new one
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if item already exists in the cart
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      // Update quantity and price
      existingItem.quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        name: product.name,
        price: product.price,
        quantity: quantity,
      });
    }

    // Recalculate total amount
    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

// Retrieve cart
router.get("/", async (req, res) => {
  const { userId } = req.query;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) return res.status(404).json({ msg: "Cart is empty" });

    res.json(cart);
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

module.exports = router;
