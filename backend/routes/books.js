const express = require("express");
const router = express.Router();
const { Book } = require("../models/Product");
const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authorizeRoles");

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


// POST /books → Add a new book (Admin Only)
router.post("/", authenticateToken, authorizeRoles(["admin"]), async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});

// PUT /books/:id → Update a book (Admin Only)
router.put("/:id", authenticateToken, authorizeRoles(["admin"]), async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Apply schema validation
    });
    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(updatedBook);
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});

// DELETE /books/:id → Delete a book (Admin Only)
router.delete("/:id", authenticateToken, authorizeRoles(["admin"]), async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ msg: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});


module.exports = router;
