const nodemailer = require('nodemailer');
const logger = require('../utils/logger'); // Importing custom logger

/**
 * Creates a nodemailer transporter for sending emails.
 * Configuration is based on environment variables.
 */
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == '465', // Use SSL for port 465
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS // Your email password
    }
});

// Verify transporter configuration
transporter.verify((error, success) => {
    if (error) {
        logger.error("Failed to configure email transporter", error); // Log errors during configuration
    } else {
        logger.success("Email transporter configured successfully");
    }
});

module.exports = transporter;
