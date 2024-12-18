const express = require("express");
const router = express.Router();
const { Book } = require("../models/Product");

// GET /books → List all books with optional filters
router.get("/", async (req, res) => {
  try {
    const filters = req.query; // Example: ?category=Fiction
    const books = await Book.find(filters);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});

// GET /books/:id → Get a specific book's details
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});

module.exports = router;
