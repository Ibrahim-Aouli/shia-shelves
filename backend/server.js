const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import CORS middleware
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json());

// Import routes
const booksRoutes = require("./routes/books");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/orders");
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");

// Use routes
app.use("/books", booksRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
app.use("/user", userRoutes);
app.use("/products", productRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Root Endpoint
app.get("/", (req, res) => res.send("Backend is running..."));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
