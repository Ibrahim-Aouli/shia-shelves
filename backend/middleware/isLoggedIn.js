const isLoggedIn = (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Access denied. Please log in." });
    }
    next();
  };
  
  module.exports = isLoggedIn;
  