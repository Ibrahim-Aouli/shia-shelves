const multer = require('multer');
const path = require('path');
const logger = require('../utils/logger'); // Importing custom logger

// Define storage options for different file types
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            // Dynamically determine the folder based on upload type
            if (req.uploadType === 'csv') {
                logger.log('Setting destination for CSV upload', { uploadType: req.uploadType });
                cb(null, 'uploads/csv/');
            } else if (req.uploadType === 'profile') {
                logger.log('Setting destination for profile picture upload', { uploadType: req.uploadType });
                cb(null, 'uploads/profile-pictures/');
            } else if (req.uploadType === 'comment') {
                logger.log('Setting destination for comment image upload', { uploadType: req.uploadType });
                cb(null, 'uploads/comments/');
            } else {
                logger.error('Invalid upload type specified', { uploadType: req.uploadType });
                cb(new Error('Invalid upload type.'));
            }
        } catch (error) {
            logger.error('Error in destination function of storage', error);
            cb(error);
        }
    },
    filename: (req, file, cb) => {
        try {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
            const newFileName = `${uniqueSuffix}-${file.originalname}`;
            logger.log('Generated unique file name', { fileName: newFileName });
            cb(null, newFileName);
        } catch (error) {
            logger.error('Error generating file name', error);
            cb(error);
        }
    }
});

// Define file filter for validation
const fileFilter = (req, file, cb) => {
    try {
        if (req.uploadType === 'csv') {
            // Allow only .csv files for admin uploads
            if (file.mimetype === 'text/csv') {
                logger.log('Valid CSV file uploaded', { fileName: file.originalname });
                cb(null, true);
            } else {
                logger.warning('Invalid file type for CSV upload', { fileType: file.mimetype });
                cb(new Error('Invalid file type. Only CSV files are allowed.'));
            }
        } else if (req.uploadType === 'profile' || req.uploadType === 'comment') {
            // Allow only image files for profile pictures or comments
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (allowedTypes.includes(file.mimetype)) {
                logger.log('Valid image file uploaded', { fileName: file.originalname });
                cb(null, true);
            } else {
                logger.warning('Invalid file type for image upload', { fileType: file.mimetype });
                cb(new Error('Invalid file type. Only images are allowed.'));
            }
        } else {
            logger.error('Invalid upload type specified during file filtering', { uploadType: req.uploadType });
            cb(new Error('Invalid upload type.'));
        }
    } catch (error) {
        logger.error('Error in file filter', error);
        cb(error);
    }
};

// Initialize Multer with storage and file filter
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Set file size limit to 5MB
});

logger.log('Multer configuration initialized with storage, file filter, and limits');

module.exports = upload;
