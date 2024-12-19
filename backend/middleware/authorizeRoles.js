// Middleware to authorize roles
const authorizeRoles = (allowedRoles) => {
    return (req, res, next) => {
      // Check if the user's role is in the allowed roles
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: "Access denied. You do not have the required role." });
      }
      next(); // User has an allowed role, proceed to the next middleware/route
    };
  };
  
  module.exports = authorizeRoles;
  