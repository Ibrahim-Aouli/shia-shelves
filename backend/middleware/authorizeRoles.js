const logger = require("../utils/logger"); // Importing custom logger

/**
 * Middleware to authorize specific user roles for a route.
 * @param {...string} allowedRoles - List of roles allowed to access the route.
 */
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // Check if the user's role is included in the allowed roles
        if (!allowedRoles.includes(req.user.role)) {
            logger.warning("Unauthorized access attempt", {
                userId: req.user._id,
                userRole: req.user.role,
                allowedRoles,
            });
            return res.status(403).json({ error: "Access denied. You do not have the required role." });
        }

        logger.success("User authorized", {
            userId: req.user._id,
            userRole: req.user.role,
            allowedRoles,
        });
        next(); // User role is authorized, proceed to the next middleware
    };
};

module.exports = authorizeRoles;
