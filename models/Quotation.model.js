const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Quotation title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: [true, 'Vendor is required'],
  },
  vendorReference: {
    type: String,
    trim: true,
  },
  quotationAmount: {
    type: Number,
    required: [true, 'Quotation amount is required'],
    min: [0, 'Amount cannot be negative'],
  },
  submissionDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'received', 'reviewed', 'approved', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update timestamp on save
quotationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Quotation', quotationSchema);