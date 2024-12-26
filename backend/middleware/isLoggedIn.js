const logger = require("../utils/logger"); // Importing custom logger

/**
 * Middleware to ensure the user is logged in.
 * Prevents unauthenticated users from accessing protected routes.
 */
const isLoggedIn = (req, res, next) => {
    if (!req.user) {
        logger.warning("Unauthorized access attempt to a protected route"); // Log unauthorized access
        return res.status(401).json({ error: "Access denied. Please log in." });
    }

    logger.success("Authenticated access granted", { userId: req.user._id, role: req.user.role });
    next(); // User is logged in, proceed to the next middleware or route handler
};

module.exports = isLoggedIn;
