const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Section routes not yet implemented' });
});

module.exports = router;