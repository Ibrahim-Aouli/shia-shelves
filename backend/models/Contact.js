const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        match: [/^\S+@\S+\.\S+$/, 'Invalid email address.'],
        set: value => value.toLowerCase()
    },
    subject: { type: String, default: 'General Inquiry' },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
