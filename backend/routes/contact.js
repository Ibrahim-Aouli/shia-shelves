const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const transporter = require('../utils/email');

// POST /contact - Submit a contact inquiry
router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    try {
        // Create and save the contact inquiry
        const newInquiry = new Contact({
            name,
            email,
            subject: subject || 'General Inquiry',
            message
        });

        await newInquiry.save();

        // Send email to yourself
        const mailOptions = {
            from: process.env.EMAIL_USER, // Your email
            to: process.env.ADMIN_EMAIL, // Your email as receiver
            subject: `New Inquiry from ${name}: ${subject || 'General Inquiry'}`,
            text: `You have a new inquiry:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `<p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong> ${message}</p>`
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'Your inquiry has been submitted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
