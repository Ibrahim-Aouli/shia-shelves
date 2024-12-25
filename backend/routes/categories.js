const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationToken');
const isAdmin = require('../middleware/isAdmin');
const Category = require('../models/Category');

// GET /categories - Retrieve all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ categories });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// GET /categories/:id - Retrieve a specific category by ID
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found.' });
        }
        res.status(200).json({ category });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// POST /categories - Create a new category (admin-only)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required.' });
    }

    try {
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ error: 'Category already exists.' });
        }

        const newCategory = new Category({ name, description });
        await newCategory.save();
        res.status(201).json({ message: 'Category created successfully.', category: newCategory });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// PUT /categories/:id - Update a category by ID (admin-only)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
    const { name, description } = req.body;

    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found.' });
        }

        category.name = name || category.name;
        category.description = description || category.description;
        await category.save();

        res.status(200).json({ message: 'Category updated successfully.', category });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// DELETE /categories/:id - Delete a category by ID (admin-only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found.' });
        }

        await category.deleteOne();
        res.status(200).json({ message: 'Category deleted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
