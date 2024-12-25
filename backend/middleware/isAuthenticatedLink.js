const isAuthenticatedLink = async (req, res, next) => {
    const token = req.query.token || req.headers['x-auth-token']; // Token from query or header
    if (!token) {
      return res.status(401).json({ error: "Access denied. Token not provided." });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("_id email role");
      if (!req.user) {
        return res.status(401).json({ error: "Invalid token." });
      }
      next();
    } catch (err) {
      res.status(400).json({ error: "Invalid token." });
    }
  };
  
  module.exports = isAuthenticatedLink;
  