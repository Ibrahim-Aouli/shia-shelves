const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationToken');
const isAdmin = require('../middleware/isAdmin');

// POST /upload
router.post('/', authenticateToken, isAdmin, (req, res) => {
    res.send('Upload a file');
});

// GET /uploads/:filename
router.get('/:filename', (req, res) => {
    res.send(`Retrieve file: ${req.params.filename}`);
});

module.exports = router;
