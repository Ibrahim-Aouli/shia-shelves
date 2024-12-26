const logger = require("../utils/logger"); // Importing custom logger

/**
 * Middleware to restrict access to routes meant for guests (unauthenticated users).
 * Prevents logged-in users from accessing guest-only routes.
 */
const isGuest = (req, res, next) => {
    if (req.user) {
        logger.warning("Access denied for logged-in user attempting guest-only route", {
            userId: req.user._id,
            role: req.user.role,
        });

        return res.status(403).json({ error: "Access denied. You are already logged in." });
    }

    logger.log("Guest access granted");
    next(); // User is not logged in, proceed to the next middleware or route handler
};

module.exports = isGuest;
