const jwt = require("jsonwebtoken");
const User = require("../models/User");
const logger = require("../utils/logger"); // Importing custom logger

/**
 * Middleware to authenticate users via a token provided in query parameters or headers.
 * Used primarily for verifying links that include a token.
 */
const isAuthenticatedLink = async (req, res, next) => {
    const token = req.query.token || req.headers['x-auth-token']; // Token from query or header

    if (!token) {
        logger.warning("Access attempt without a token"); // Log missing token scenario
        return res.status(401).json({ error: "Access denied. Token not provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        logger.log("Token verified successfully", { decoded });

        // Fetch the user using the decoded token ID
        req.user = await User.findById(decoded.id).select("_id email role");

        if (!req.user) {
            logger.warning("Token verified but no matching user found", { userId: decoded.id });
            return res.status(401).json({ error: "Invalid token." });
        }

        logger.success("Authenticated user via link token", { userId: req.user._id, role: req.user.role });
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        logger.error("Token verification failed", err); // Log error details
        res.status(400).json({ error: "Invalid token." });
    }
};

module.exports = isAuthenticatedLink;
