const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const authenticateToken = require("../middleware/authMiddleware");

// POST /orders → Create a new order
router.post("/", authenticateToken, async (req, res) => {
  const { lineItems, shippingAddress, billingAddress } = req.body;

  try {
    const newOrder = new Order({
      user: req.user.id, // From authenticateToken middleware
      lineItems,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress, // Use shipping if billing not provided
      totalAmount: lineItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});

// PUT /orders/:id → Update an order
router.put("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { lineItems, shippingAddress, billingAddress, status } = req.body;

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Check if the user owns the order or is an admin
    if (req.user.id !== order.user.toString() && req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. You can only update your own orders." });
    }

    // Update allowed fields
    if (lineItems) order.lineItems = lineItems;
    if (shippingAddress) order.shippingAddress = shippingAddress;
    if (billingAddress) order.billingAddress = billingAddress;
    if (req.user.role === "admin" && status) order.status = status; // Only admin can update status

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    console.error("Order update error:", err);
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});


// DELETE /orders/:id → Delete an order
router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Only admins can delete orders." });
    }

    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ msg: "Order deleted successfully" });
  } catch (err) {
    console.error("Order deletion error:", err);
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});

// PUT /orders/:id/cancel → Cancel an order
router.put("/:id/cancel", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (req.user.id !== order.user.toString() && req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. You can only cancel your own orders." });
    }

    order.status = "cancelled";
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    console.error("Order cancellation error:", err);
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});

// GET /orders/:id/progress → View order progress
router.get("/:id/progress", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id, "status");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ status: order.status });
  } catch (err) {
    console.error("Order progress error:", err);
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});

// GET /orders/:id → View order details
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (req.user.id !== order.user.toString() && req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. You can only view your own orders." });
    }

    res.json(order);
  } catch (err) {
    console.error("Order details error:", err);
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});

module.exports = router;