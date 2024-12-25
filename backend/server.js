const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON request bodies

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the application if the database fails to connect
  });

// Root Endpoint
app.get("/", (req, res) => res.send("Backend is running..."));

// Import Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/categories");
const orderRoutes = require("./routes/orders");
const cartRoutes = require("./routes/cart");
const paymentRoutes = require("./routes/payment");
const faqRoutes = require("./routes/faq");
const contactRoutes = require("./routes/contact");
const reportRoutes = require("./routes/reports");
const uploadRoutes = require("./routes/upload");

// API Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/orders", orderRoutes);
app.use("/cart", cartRoutes);
app.use("/payment", paymentRoutes);
app.use("/faq", faqRoutes);
app.use("/contact", contactRoutes);
app.use("/reports", reportRoutes);
app.use("/upload", uploadRoutes);

// Error Handling Middleware (Global)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
