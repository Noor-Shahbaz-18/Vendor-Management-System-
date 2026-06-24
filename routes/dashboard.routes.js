const express = require('express');
const router = express.Router();
const { getStats, getStatusDistribution } = require('../controllers/dashboard.controller');
const { protect } = require('../middleware/auth.middleware');

router.use(protect);

router.get('/stats', getStats);
router.get('/status-distribution', getStatusDistribution);

module.exports = router;