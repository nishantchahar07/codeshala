const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Tag routes not yet implemented' });
});

module.exports = router;