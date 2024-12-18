const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// POST /order → Create a new order
router.post("/", async (req, res) => {
  const { user, lineItems, shippingAddress, billingAddress, totalAmount } = req.body;

  try {
    const newOrder = new Order({
      user,
      lineItems,
      shippingAddress,
      billingAddress,
      totalAmount,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});

// GET /order/:id → Retrieve order details
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user lineItems.product");
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});

module.exports = router;
