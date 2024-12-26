const logger = require('../utils/logger'); // Importing custom logger

/**
 * Middleware to check if the user is an admin.
 * Allows access only to users with the 'admin' role.
 */
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        logger.success('Admin access granted', { userId: req.user._id, role: req.user.role });
        return next(); // User is an admin, proceed to the next middleware or route handler
    }

    logger.warning('Unauthorized admin access attempt', {
        userId: req.user ? req.user._id : null,
        role: req.user ? req.user.role : 'guest',
    });

    return res.status(403).json({ message: 'Forbidden. Admin access only.' });
};

module.exports = isAdmin;
