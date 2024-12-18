const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load .env variables


const User = require("../models/User");
const authenticateToken = require("../middleware/authMiddleware");


const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET; // Access secret from .env

router.get("/", authenticateToken, async (req, res) => {
  try {
    const users = await User.find({}, "_id email name role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});


// POST /register → Register a new user
router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      email,
      passwordHash: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    await user.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login attempt for email:", email); // Debug email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    console.log("User found:", user); // Debug user data

    // Check password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    console.log("Password match:", isMatch); // Debug password check result
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("Token generated:", token); // Debug token

    res.json({ token, userId: user.id, email: user.email });
  } catch (err) {
    console.error("Server error:", err); // Debug unexpected errors
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});

module.exports = router;
