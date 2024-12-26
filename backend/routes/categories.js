const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationToken');
const isAdmin = require('../middleware/isAdmin');
const Category = require('../models/Category');
const logger = require('../utils/logger'); // Import custom logger

// GET /categories - Retrieve all categories
router.get('/', async (req, res) => {
    try {
        logger.action('Fetching all categories');
        const categories = await Category.find();
        logger.log('Categories retrieved successfully', { count: categories.length });
        res.status(200).json({ categories });
    } catch (err) {
        logger.error('Error retrieving categories', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// GET /categories/:id - Retrieve a specific category by ID
router.get('/:id', async (req, res) => {
    try {
        logger.action('Fetching category by ID', { categoryId: req.params.id });
        const category = await Category.findById(req.params.id);

        if (!category) {
            logger.warning('Category not found', { categoryId: req.params.id });
            return res.status(404).json({ error: 'Category not found.' });
        }

        logger.log('Category retrieved successfully', { category });
        res.status(200).json({ category });
    } catch (err) {
        logger.error('Error retrieving category', { categoryId: req.params.id, error: err });
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// POST /categories - Create a new category (admin-only)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
    const { name, description } = req.body;

    if (!name) {
        logger.warning('Category creation failed due to missing name');
        return res.status(400).json({ error: 'Name is required.' });
    }

    try {
        logger.action('Creating new category', { name });
        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            logger.warning('Category creation failed because the category already exists', { name });
            return res.status(400).json({ error: 'Category already exists.' });
        }

        const newCategory = new Category({ name, description });
        await newCategory.save();
        logger.success('Category created successfully', { category: newCategory });
        res.status(201).json({ message: 'Category created successfully.', category: newCategory });
    } catch (err) {
        logger.error('Error creating category', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// PUT /categories/:id - Update a category by ID (admin-only)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
    const { name, description } = req.body;

    try {
        logger.action('Updating category by ID', { categoryId: req.params.id });
        const category = await Category.findById(req.params.id);

        if (!category) {
            logger.warning('Category update failed because the category was not found', { categoryId: req.params.id });
            return res.status(404).json({ error: 'Category not found.' });
        }

        category.name = name || category.name;
        category.description = description || category.description;
        await category.save();

        logger.success('Category updated successfully', { category });
        res.status(200).json({ message: 'Category updated successfully.', category });
    } catch (err) {
        logger.error('Error updating category', { categoryId: req.params.id, error: err });
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// DELETE /categories/:id - Delete a category by ID (admin-only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        logger.action('Deleting category by ID', { categoryId: req.params.id });
        const category = await Category.findById(req.params.id);

        if (!category) {
            logger.warning('Category deletion failed because the category was not found', { categoryId: req.params.id });
            return res.status(404).json({ error: 'Category not found.' });
        }

        await category.deleteOne();
        logger.success('Category deleted successfully', { categoryId: req.params.id });
        res.status(200).json({ message: 'Category deleted successfully.' });
    } catch (err) {
        logger.error('Error deleting category', { categoryId: req.params.id, error: err });
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
