const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateToken = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token from Authorization header
  if (!token) return res.status(401).json({ error: "Access denied, no token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = await User.findById(decoded.id).select("_id email role"); // Fetch user details

    if (!req.user) return res.status(401).json({ error: "Invalid token." });

    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token." }); // Invalid token handling
  }
};

module.exports = authenticateToken;
