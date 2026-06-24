const { body, param } = require('express-validator');

// Vendor validation
exports.validateVendor = [
  body('vendorName')
    .notEmpty()
    .withMessage('Vendor name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Vendor name must be between 2 and 100 characters'),
  body('companyName')
    .notEmpty()
    .withMessage('Company name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('contactNumber')
    .notEmpty()
    .withMessage('Contact number is required')
    .isLength({ min: 10, max: 20 })
    .withMessage('Contact number must be between 10 and 20 characters'),
  body('businessAddress')
    .notEmpty()
    .withMessage('Business address is required'),
];

// Quotation validation
exports.validateQuotation = [
  body('title')
    .notEmpty()
    .withMessage('Quotation title is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters'),
  body('description')
    .notEmpty()
    .withMessage('Description is required'),
  body('vendor')
    .notEmpty()
    .withMessage('Vendor ID is required')
    .isMongoId()
    .withMessage('Invalid vendor ID'),
  body('quotationAmount')
    .isNumeric()
    .withMessage('Quotation amount must be a number')
    .isFloat({ min: 0 })
    .withMessage('Quotation amount cannot be negative'),
];

// User validation
exports.validateUser = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

// ID validation
exports.validateId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format'),
];