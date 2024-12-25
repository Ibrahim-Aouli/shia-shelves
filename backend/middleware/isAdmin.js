const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next(); // User is an admin
    }
    return res.status(403).json({ message: 'Forbidden. Admin access only.' });
};

module.exports = isAdmin;
