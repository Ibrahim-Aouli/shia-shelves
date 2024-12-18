const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load .env variables

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied, no token provided." });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; // Attach user data to the request object
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token." });
  }
};

module.exports = authenticateToken;
