const express = require('express');
const router = express.Router();
const barangController = require('../controllers/barangController.js');

router.get('/chart', barangController.getAllBarang);

module.exports = router;