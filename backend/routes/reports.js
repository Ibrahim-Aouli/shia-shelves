const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationToken');
const isAdmin = require('../middleware/isAdmin');
const Order = require('../models/Order');
const User = require('../models/User');
const logger = require('../utils/logger'); // Import custom logger

// GET /reports/sales - Generate sales report
router.get('/sales', authenticateToken, isAdmin, async (req, res) => {
    try {
        logger.action('Generating sales report');
        const orders = await Order.find();

        // Total sales and orders
        const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        const totalOrders = orders.length;

        // Sales grouped by date
        const salesByDate = {};
        orders.forEach(order => {
            const date = order.createdAt.toISOString().split('T')[0];
            if (!salesByDate[date]) salesByDate[date] = 0;
            salesByDate[date] += order.totalAmount;
        });

        logger.success('Sales report generated successfully', { totalSales, totalOrders, salesByDate });
        res.status(200).json({
            totalSales,
            totalOrders,
            salesByDate
        });
    } catch (err) {
        logger.error('Error generating sales report', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// GET /reports/users - Generate user activity report
router.get('/users', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        logger.action('Generating user activity report', { startDate, endDate });

        // Total registered users
        const totalUsers = await User.countDocuments();

        // Filter new users by date range if provided
        const filter = {};
        if (startDate) filter.createdAt = { $gte: new Date(startDate) };
        if (endDate) filter.createdAt = { ...filter.createdAt, $lte: new Date(endDate) };

        const newUsers = await User.countDocuments(filter);

        logger.success('User activity report generated successfully', {
            totalUsers,
            newUsers,
            startDate: startDate || null,
            endDate: endDate || null
        });

        res.status(200).json({
            totalUsers,
            newUsers,
            startDate: startDate || null,
            endDate: endDate || null
        });
    } catch (err) {
        logger.error('Error generating user activity report', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
