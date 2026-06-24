const express = require('express');
const router = express.Router();
const {
  createQuotation,
  getQuotations,
  getQuotation,
  updateQuotation,
  deleteQuotation,
  updateStatus,
} = require('../controllers/quotation.controller');
const { protect } = require('../middleware/auth.middleware');
const { validateQuotation, validateId } = require('../middleware/validate.middleware');

router.use(protect); // All routes require authentication

router.route('/')
  .post(validateQuotation, createQuotation)
  .get(getQuotations);

router.route('/:id')
  .get(validateId, getQuotation)
  .put(validateId, validateQuotation, updateQuotation)
  .delete(validateId, deleteQuotation);

router.patch('/:id/status', validateId, updateStatus);

module.exports = router;