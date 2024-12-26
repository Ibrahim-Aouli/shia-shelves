const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');
const authenticateToken = require('../middleware/authenticationToken');
const isAdmin = require('../middleware/isAdmin');
const logger = require('../utils/logger'); // Import custom logger

// Admin upload CSV files
router.post('/csv', authenticateToken, isAdmin, (req, res, next) => {
    req.uploadType = 'csv'; // Set upload type
    next();
}, upload.single('file'), (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            logger.warning('CSV file upload failed: No file uploaded', { userId: req.user.id });
            return res.status(400).json({ error: 'No file uploaded.' });
        }
        logger.success('CSV file uploaded successfully', { userId: req.user.id, fileName: file.filename });
        res.status(201).json({ message: 'CSV file uploaded successfully.', fileUrl: `/uploads/csv/${file.filename}` });
    } catch (err) {
        logger.error('Error uploading CSV file', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// User upload profile picture
router.post('/profile', authenticateToken, (req, res, next) => {
    req.uploadType = 'profile'; // Set upload type
    next();
}, upload.single('file'), (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            logger.warning('Profile picture upload failed: No file uploaded', { userId: req.user.id });
            return res.status(400).json({ error: 'No file uploaded.' });
        }
        logger.success('Profile picture uploaded successfully', { userId: req.user.id, fileName: file.filename });
        res.status(201).json({ message: 'Profile picture uploaded successfully.', fileUrl: `/uploads/profile-pictures/${file.filename}` });
    } catch (err) {
        logger.error('Error uploading profile picture', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// User upload comment image
router.post('/comment', authenticateToken, (req, res, next) => {
    req.uploadType = 'comment'; // Set upload type
    next();
}, upload.single('file'), (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            logger.warning('Comment image upload failed: No file uploaded', { userId: req.user.id });
            return res.status(400).json({ error: 'No file uploaded.' });
        }
        logger.success('Comment image uploaded successfully', { userId: req.user.id, fileName: file.filename });
        res.status(201).json({ message: 'Comment image uploaded successfully.', fileUrl: `/uploads/comments/${file.filename}` });
    } catch (err) {
        logger.error('Error uploading comment image', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
