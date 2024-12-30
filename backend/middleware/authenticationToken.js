const jwt = require("jsonwebtoken");
const User = require("../models/User");
const logger = require("../utils/logger"); // Importing custom logger

/**
 * Middleware to authenticate and verify JSON Web Tokens (JWTs).
 */
const authenticateToken = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract token from Authorization header

    if (!token) {
        logger.warning("Access attempt without a token", { ip: req.ip, url: req.originalUrl });
        return res.status(401).json({ error: "Access denied, no token provided." }); // Explicitly return 401
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        logger.log("Token verified successfully", { decoded });

        // Fetch the user details using the decoded ID from the token
        req.user = await User.findById(decoded.id).select("_id email role");

        if (!req.user) {
            logger.warning("Token verified but no matching user found", { userId: decoded.id });
            return res.status(401).json({ error: "Invalid token." });
        }

        logger.success("User authenticated", {
            userId: req.user._id,
            role: req.user.role,
            ip: req.ip,
            url: req.originalUrl,
        });
                
        next(); // Proceed to the next middleware
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            logger.warning("Token expired", { error: err.message });
            res.status(401).json({ error: "Token expired." });
        } else {
            logger.error("Token verification failed", err);
            res.status(400).json({ error: "Invalid token." });
        }
    }    
};

module.exports = authenticateToken;
