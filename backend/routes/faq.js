const express = require('express');
const router = express.Router();
const FAQ = require('../models/FAQ');
const authenticateToken = require('../middleware/authenticationToken');
const isAdmin = require('../middleware/isAdmin');
const logger = require('../utils/logger'); // Import custom logger

// GET /faq - Retrieve all FAQs
router.get('/', async (req, res) => {
    try {
        logger.action('Fetching all FAQs');
        const faqs = await FAQ.find();
        logger.log('FAQs retrieved successfully', { count: faqs.length });
        res.status(200).json({ faqs });
    } catch (err) {
        logger.error('Error retrieving FAQs', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// GET /faq/:id - Retrieve a specific FAQ by ID
router.get('/:id', async (req, res) => {
    try {
        logger.action('Fetching FAQ by ID', { faqId: req.params.id });
        const faq = await FAQ.findById(req.params.id);

        if (!faq) {
            logger.warning('FAQ not found', { faqId: req.params.id });
            return res.status(404).json({ error: 'FAQ not found.' });
        }

        logger.log('FAQ retrieved successfully', { faq });
        res.status(200).json({ faq });
    } catch (err) {
        logger.error('Error retrieving FAQ by ID', { faqId: req.params.id, error: err });
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// POST /faq - Create a new FAQ (admin-only)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
    const { question, answer } = req.body;

    if (!question || !answer) {
        logger.warning('FAQ creation failed due to missing fields', { question, answer });
        return res.status(400).json({ error: 'Question and answer are required.' });
    }

    try {
        logger.action('Creating new FAQ', { question });
        const newFaq = new FAQ({ question, answer });
        await newFaq.save();
        logger.success('FAQ created successfully', { faq: newFaq });
        res.status(201).json({ message: 'FAQ created successfully.', faq: newFaq });
    } catch (err) {
        logger.error('Error creating FAQ', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// PUT /faq/:id - Update an FAQ by ID (admin-only)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
    const { question, answer } = req.body;

    try {
        logger.action('Updating FAQ by ID', { faqId: req.params.id });
        const faq = await FAQ.findById(req.params.id);

        if (!faq) {
            logger.warning('FAQ update failed because FAQ was not found', { faqId: req.params.id });
            return res.status(404).json({ error: 'FAQ not found.' });
        }

        if (question) faq.question = question;
        if (answer) faq.answer = answer;
        faq.updatedAt = Date.now();

        await faq.save();
        logger.success('FAQ updated successfully', { faq });
        res.status(200).json({ message: 'FAQ updated successfully.', faq });
    } catch (err) {
        logger.error('Error updating FAQ', { faqId: req.params.id, error: err });
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// DELETE /faq/:id - Delete an FAQ by ID (admin-only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        logger.action('Deleting FAQ by ID', { faqId: req.params.id });
        const faq = await FAQ.findById(req.params.id);

        if (!faq) {
            logger.warning('FAQ deletion failed because FAQ was not found', { faqId: req.params.id });
            return res.status(404).json({ error: 'FAQ not found.' });
        }

        await faq.deleteOne();
        logger.success('FAQ deleted successfully', { faqId: req.params.id });
        res.status(200).json({ message: 'FAQ deleted successfully.' });
    } catch (err) {
        logger.error('Error deleting FAQ', { faqId: req.params.id, error: err });
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
