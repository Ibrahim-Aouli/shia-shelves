const express = require("express");
const router = express.Router();
const { Product } = require("../models/Product");
const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authorizeRoles");

// GET /products → List all products with filters
router.get("/", async (req, res) => {
  try {
    const filters = req.query; // Example: ?category=Gifts
    const products = await Product.find(filters);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});

// GET /products/:id → Get details of a specific product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});

// POST /products → Add a new product (Admin Only)
router.post("/", authenticateToken, authorizeRoles(["admin"]), async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});

// PUT /products/:id → Update a product (Admin Only)
router.put("/:id", authenticateToken, authorizeRoles(["admin"]), async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Apply schema validation
    });
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});

// DELETE /products/:id → Delete a product (Admin Only)
router.delete("/:id", authenticateToken, authorizeRoles(["admin"]), async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ msg: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});

module.exports = router;
