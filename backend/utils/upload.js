const multer = require('multer');
const path = require('path');

// Define storage options for different file types
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Dynamically determine the folder based on upload type
        if (req.uploadType === 'csv') {
            cb(null, 'uploads/csv/');
        } else if (req.uploadType === 'profile') {
            cb(null, 'uploads/profile-pictures/');
        } else if (req.uploadType === 'comment') {
            cb(null, 'uploads/comments/');
        } else {
            cb(new Error('Invalid upload type.'));
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

// Define file filter for validation
const fileFilter = (req, file, cb) => {
    if (req.uploadType === 'csv') {
        // Allow only .csv files for admin uploads
        if (file.mimetype === 'text/csv') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only CSV files are allowed.'));
        }
    } else if (req.uploadType === 'profile' || req.uploadType === 'comment') {
        // Allow only image files for profile pictures or comments
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only images are allowed.'));
        }
    } else {
        cb(new Error('Invalid upload type.'));
    }
};

// Initialize Multer with storage and file filter
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Set file size limit to 5MB
});

module.exports = upload;
