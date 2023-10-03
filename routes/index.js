const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/words', require('./words'));

module.exports = router;