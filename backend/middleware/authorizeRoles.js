const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied. You do not have the required role." });
    }
    next(); // User role is authorized, proceed
  };
};

module.exports = authorizeRoles;
