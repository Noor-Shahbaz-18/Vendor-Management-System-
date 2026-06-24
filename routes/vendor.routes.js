const express = require('express');
const router = express.Router();
const {
  createVendor,
  getVendors,
  getVendor,
  updateVendor,
  deleteVendor,
} = require('../controllers/vendor.controller');
const { protect } = require('../middleware/auth.middleware');
const { validateVendor, validateId } = require('../middleware/validate.middleware');

router.use(protect); // All routes require authentication

router.route('/')
  .post(validateVendor, createVendor)
  .get(getVendors);

router.route('/:id')
  .get(validateId, getVendor)
  .put(validateId, validateVendor, updateVendor)
  .delete(validateId, deleteVendor);

module.exports = router;