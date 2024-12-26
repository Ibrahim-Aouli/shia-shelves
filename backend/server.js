const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const helmet = require("helmet");
require("dotenv").config();

const logger = require("./utils/logger"); // Import the logger utility

const app = express();
const PORT = process.env.PORT || 5000;
const dbUri = process.env.NODE_ENV === "test" ? process.env.TEST_DB_URI : process.env.DB_URI;

// Log environment variables
logger.log("Environment Variables Loaded", {
  PORT,
  NODE_ENV: process.env.NODE_ENV,
  DB_URI: process.env.DB_URI,
  TEST_DB_URI: process.env.TEST_DB_URI,
  SESSION_SECRET: process.env.SESSION_SECRET ? "****" : "NOT SET",
  VERBOSE: process.env.VERBOSE,
});

// Middleware
logger.action("Initializing Middleware");
app.use(helmet());
logger.success("Helmet initialized for security headers");
app.use(cors());
logger.success("CORS enabled for all origins");
app.use(express.json());
logger.success("JSON request body parser initialized");

// Session Middleware
logger.action("Setting up session middleware");
if (!process.env.SESSION_SECRET) {
  logger.warning("Session middleware is using the default secret. This is not secure!");
}
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback-secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: dbUri,
      ttl: 14 * 24 * 60 * 60, // Session lifetime (14 days)
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
    },
  })
);
logger.success("Session middleware initialized");

// MongoDB Connection
logger.action("Connecting to MongoDB", { dbUri });
mongoose
  .connect(dbUri)
  .then(() => logger.success("MongoDB connected successfully"))
  .catch((err) => logger.error("MongoDB connection error", err));

// Root Endpoint
logger.action("Setting up root endpoint");
app.get("/", (req, res) => res.send("Backend is running..."));

// Import Routes
logger.action("Importing routes");
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
logger.action("Setting up API routes");
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
logger.action("Setting up error handling middleware");
app.use((err, req, res, next) => {
  logger.error("Global error handler caught an error", err);
  res.status(500).json({ error: "Something went wrong!" });
});

logger.success("Server initialization complete");

module.exports = app;
