const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authenticateToken = require('../middleware/authenticationToken');
const isAdmin = require('../middleware/isAdmin');
const logger = require('../utils/logger'); // Import custom logger

// GET /products - Retrieve filtered and sorted products
router.get('/', async (req, res) => {
    const { 
        itemType, 
        category, 
        subCategory, 
        tags, 
        minPrice, 
        maxPrice, 
        sortBy, 
        order = 'asc', 
        page = 1, 
        limit = 10 
    } = req.query;

    try {
        logger.action('Fetching filtered and sorted products', req.query);

        const filter = {};

        // Filter by item type, category, and subcategory
        if (itemType) filter.itemType = itemType;
        if (category) filter.category = category;
        if (subCategory) filter.subCategory = subCategory;

        // Filter by tags
        if (tags) {
            const tagsArray = tags.split(',');
            filter.tags = { $in: tagsArray };
        }

        // Filter by price range
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseFloat(minPrice);
            if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
        }

        // Determine sorting
        const sortOptions = {};
        if (sortBy) {
            const sortField = sortBy === 'price' ? 'price' :
                              sortBy === 'rating' ? 'rating' : 
                              sortBy === 'releaseDate' ? 'createdAt' : null;

            if (sortField) {
                sortOptions[sortField] = order === 'desc' ? -1 : 1;
            }
        }

        // Pagination options
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Fetch products
        const products = await Product.find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit));

        // Count total products for pagination
        const totalProducts = await Product.countDocuments(filter);

        logger.log('Products fetched successfully', { count: products.length });

        res.status(200).json({
            products,
            pagination: {
                totalProducts,
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalProducts / limit),
                limit: parseInt(limit)
            }
        });
    } catch (err) {
        logger.error('Error fetching products', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// GET /products/:id - Retrieve a specific product by ID
router.get('/:id', async (req, res) => {
    try {
        logger.action('Fetching product by ID', { productId: req.params.id });
        const product = await Product.findById(req.params.id);

        if (!product) {
            logger.warning('Product not found', { productId: req.params.id });
            return res.status(404).json({ error: 'Product not found.' });
        }

        logger.log('Product fetched successfully', { product });
        res.status(200).json({ product });
    } catch (err) {
        logger.error('Error fetching product', { productId: req.params.id, error: err });
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// POST /products - Create a new product (admin-only)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
    const { name, price, sku, itemType } = req.body;

    if (!name || !price || !sku || !itemType) {
        logger.warning('Product creation failed due to missing fields', req.body);
        return res.status(400).json({ error: 'Name, price, SKU, and item type are required.' });
    }

    try {
        logger.action('Creating new product', { name, price, sku, itemType });
        const newProduct = new Product(req.body);
        await newProduct.save();

        logger.success('Product created successfully', { product: newProduct });
        res.status(201).json({ message: 'Product created successfully.', product: newProduct });
    } catch (err) {
        logger.error('Error creating product', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// PUT /products/:id - Update an existing product by ID (admin-only)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        logger.action('Updating product', { productId: req.params.id, updates: req.body });
        const product = await Product.findById(req.params.id);

        if (!product) {
            logger.warning('Product not found for update', { productId: req.params.id });
            return res.status(404).json({ error: 'Product not found.' });
        }

        Object.keys(req.body).forEach(key => {
            product[key] = req.body[key];
        });

        product.updatedAt = Date.now();
        await product.save();

        logger.success('Product updated successfully', { product });
        res.status(200).json({ message: 'Product updated successfully.', product });
    } catch (err) {
        logger.error('Error updating product', { productId: req.params.id, error: err });
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// DELETE /products/:id - Delete a product by ID (admin-only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        logger.action('Deleting product', { productId: req.params.id });
        const product = await Product.findById(req.params.id);

        if (!product) {
            logger.warning('Product not found for deletion', { productId: req.params.id });
            return res.status(404).json({ error: 'Product not found.' });
        }

        await product.deleteOne();
        logger.success('Product deleted successfully', { productId: req.params.id });
        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (err) {
        logger.error('Error deleting product', { productId: req.params.id, error: err });
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
