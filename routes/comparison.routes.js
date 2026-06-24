const express = require('express');
const router = express.Router();
const { 
  compareVendorQuotations, 
  getAllForComparison 
} = require('../controllers/comparison.controller');
const { protect } = require('../middleware/auth.middleware');

router.use(protect);

router.get('/all', getAllForComparison);
router.get('/vendor/:vendorId', compareVendorQuotations);

module.exports = router;