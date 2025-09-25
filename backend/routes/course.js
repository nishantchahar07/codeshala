const express = require('express');
const router = express.Router();

// Placeholder routes for course
router.get('/', (req, res) => {
    res.json({ message: 'Course routes not yet implemented' });
});

module.exports = router;