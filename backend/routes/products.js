const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authenticateToken = require('../middleware/authenticationToken');
const isAdmin = require('../middleware/isAdmin');

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
        const filter = {};

        // Filter by item type, category, and subcategory
        if (itemType) filter.itemType = itemType;
        if (category) filter.category = category;
        if (subCategory) filter.subCategory = subCategory;

        // Filter by tags
        if (tags) {
            const tagsArray = tags.split(','); // Convert comma-separated tags to an array
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
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});


// GET /products/:id - Retrieve a specific product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        res.status(200).json({ product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// POST /products - Create a new product (admin-only)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
    const { name, price, sku, itemType, category } = req.body;

    if (!name || !price || !sku || !itemType) {
        return res.status(400).json({ error: 'Name, price, SKU, and item type are required.' });
    }

    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully.', product: newProduct });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// PUT /products/:id - Update an existing product by ID (admin-only)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        // Update fields dynamically based on request body
        Object.keys(req.body).forEach(key => {
            product[key] = req.body[key];
        });

        product.updatedAt = Date.now();
        await product.save();

        res.status(200).json({ message: 'Product updated successfully.', product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// DELETE /products/:id - Delete a product by ID (admin-only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        await product.deleteOne();
        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
