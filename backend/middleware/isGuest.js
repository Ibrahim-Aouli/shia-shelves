const isGuest = (req, res, next) => {
    if (req.user) {
      return res.status(403).json({ error: "Access denied. You are already logged in." });
    }
    next();
  };
  
  module.exports = isGuest;
  