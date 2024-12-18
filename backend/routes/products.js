const express = require("express");
const router = express.Router();
const { Product } = require("../models/Product");

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

// POST /products → Add a new product (Admin only)
router.post("/", async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = new Product(productData);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});

// PUT /products/:id → Update an existing product (Admin only)
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ error: "Product not found" });
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});

// DELETE /products/:id → Delete a product (Admin only)
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ error: "Product not found" });
    res.json({ msg: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});

module.exports = router;
