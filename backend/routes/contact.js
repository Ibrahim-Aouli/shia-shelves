const express = require('express');
const router = express.Router();

// POST /contact
router.post('/', (req, res) => {
    res.send('Submit a contact request');
});

module.exports = router;
