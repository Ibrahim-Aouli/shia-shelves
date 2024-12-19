const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authorizeRoles");
const JWT_SECRET = process.env.JWT_SECRET; // Ensure this is defined in your .env file
// GET /user → Admin-only route to fetch all users
router.get("/", authenticateToken, authorizeRoles(["admin"]), async (req, res) => {
  try {
    const users = await User.find({}, "_id email name role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});

// DELETE /user/:id → Admin-only route to delete a usera
router.delete("/:id", authenticateToken, authorizeRoles(["admin"]), async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});

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
      role: "user" // Default role
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


router.put("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const requestingUser = req.user; // From authenticateToken middleware
  const updatedData = req.body; // Data to be updated

  try {
    // Find the user being updated
    const userToUpdate = await User.findById(id);
    if (!userToUpdate) {
      return res.status(404).json({ error: "User not found" });
    }

    // Restrict updates for non-admins
    if (requestingUser.role !== "admin" && requestingUser.id !== id) {
      return res.status(403).json({ error: "Access denied. You can only update your own information." });
    }

    // Prevent non-admins from updating the `role` field
    if (requestingUser.role !== "admin" && "role" in updatedData) {
      delete updatedData.role; // Remove role from update
    }

    // If updating password, hash it
    if (updatedData.password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.passwordHash = await bcrypt.hash(updatedData.password, salt);
      delete updatedData.password; // Remove plain password
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Apply schema validation
    });

    res.json(updatedUser);
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});

// POST /user/create-admin → Admin-only route to create an admin account
router.post("/create-admin", authenticateToken, authorizeRoles(["admin"]), async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin user
    user = new User({
      email,
      passwordHash: hashedPassword,
      name: `${firstName} ${lastName}`,
      role: "admin" // Explicitly set admin role
    });

    await user.save();
    res.status(201).json({ msg: "Admin user created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});

module.exports = router;
