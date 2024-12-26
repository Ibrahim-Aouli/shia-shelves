const express = require('express');
const router = express.Router();
const FAQ = require('../models/FAQ');
const authenticateToken = require('../middleware/authenticationToken');
const isAdmin = require('../middleware/isAdmin');

// GET /faq - Retrieve all FAQs
router.get('/', async (req, res) => {
    try {
        const faqs = await FAQ.find();
        res.status(200).json({ faqs });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// GET /faq/:id - Retrieve a specific FAQ by ID
router.get('/:id', async (req, res) => {
    try {
        const faq = await FAQ.findById(req.params.id);
        if (!faq) {
            return res.status(404).json({ error: 'FAQ not found.' });
        }
        res.status(200).json({ faq });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// POST /faq - Create a new FAQ (admin-only)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
    const { question, answer } = req.body;

    if (!question || !answer) {
        return res.status(400).json({ error: 'Question and answer are required.' });
    }

    try {
        const newFaq = new FAQ({ question, answer });
        await newFaq.save();
        res.status(201).json({ message: 'FAQ created successfully.', faq: newFaq });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// PUT /faq/:id - Update an FAQ by ID (admin-only)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
    const { question, answer } = req.body;

    try {
        const faq = await FAQ.findById(req.params.id);
        if (!faq) {
            return res.status(404).json({ error: 'FAQ not found.' });
        }

        if (question) faq.question = question;
        if (answer) faq.answer = answer;
        faq.updatedAt = Date.now();

        await faq.save();
        res.status(200).json({ message: 'FAQ updated successfully.', faq });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// DELETE /faq/:id - Delete an FAQ by ID (admin-only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const faq = await FAQ.findById(req.params.id);
        if (!faq) {
            return res.status(404).json({ error: 'FAQ not found.' });
        }

        await faq.deleteOne();
        res.status(200).json({ message: 'FAQ deleted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
