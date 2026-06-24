const Quotation = require('../models/Quotation.model');
const Vendor = require('../models/Vendor.model');
const ActivityLog = require('../models/Activitylog.model');
const { validationResult } = require('express-validator');

// @desc    Create quotation
// @route   POST /api/quotations
// @access  Private
exports.createQuotation = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if vendor exists
    const vendor = await Vendor.findById(req.body.vendor);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    const quotation = await Quotation.create(req.body);

    // Populate vendor details
    await quotation.populate('vendor', 'vendorName companyName email');

    // Log activity
    await ActivityLog.create({
      user: req.user._id,
      action: 'create',
      entityType: 'quotation',
      entityId: quotation._id,
      details: `Quotation "${quotation.title}" created for vendor ${vendor.vendorName}`,
    });

    res.status(201).json(quotation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all quotations
// @route   GET /api/quotations
// @access  Private
exports.getQuotations = async (req, res) => {
  try {
    const { status, vendor, search, sort, order = 'asc' } = req.query;
    let query = {};

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by vendor
    if (vendor) {
      query.vendor = vendor;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { vendorReference: { $regex: search, $options: 'i' } },
      ];
    }

    let sortOption = {};
    if (sort) {
      sortOption[sort] = order === 'desc' ? -1 : 1;
    } else {
      sortOption = { createdAt: -1 };
    }

    const quotations = await Quotation.find(query)
      .populate('vendor', 'vendorName companyName email contactNumber')
      .sort(sortOption);

    res.json(quotations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single quotation
// @route   GET /api/quotations/:id
// @access  Private
exports.getQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id)
      .populate('vendor', 'vendorName companyName email contactNumber businessAddress');

    if (!quotation) {
      return res.status(404).json({ message: 'Quotation not found' });
    }

    // Log activity
    await ActivityLog.create({
      user: req.user._id,
      action: 'view',
      entityType: 'quotation',
      entityId: quotation._id,
      details: `Quotation "${quotation.title}" viewed`,
    });

    res.json(quotation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update quotation
// @route   PUT /api/quotations/:id
// @access  Private
exports.updateQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id);
    if (!quotation) {
      return res.status(404).json({ message: 'Quotation not found' });
    }

    const updatedQuotation = await Quotation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('vendor', 'vendorName companyName email');

    // Log activity
    await ActivityLog.create({
      user: req.user._id,
      action: 'update',
      entityType: 'quotation',
      entityId: quotation._id,
      details: `Quotation "${quotation.title}" updated`,
    });

    res.json(updatedQuotation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete quotation
// @route   DELETE /api/quotations/:id
// @access  Private
exports.deleteQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id);
    if (!quotation) {
      return res.status(404).json({ message: 'Quotation not found' });
    }

    await quotation.deleteOne();

    // Log activity
    await ActivityLog.create({
      user: req.user._id,
      action: 'delete',
      entityType: 'quotation',
      entityId: quotation._id,
      details: `Quotation "${quotation.title}" deleted`,
    });

    res.json({ message: 'Quotation removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update quotation status
// @route   PATCH /api/quotations/:id/status
// @access  Private
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const quotation = await Quotation.findById(req.params.id);
    if (!quotation) {
      return res.status(404).json({ message: 'Quotation not found' });
    }

    quotation.status = status;
    await quotation.save();

    // Log activity
    await ActivityLog.create({
      user: req.user._id,
      action: status === 'approved' ? 'approve' : 'reject',
      entityType: 'quotation',
      entityId: quotation._id,
      details: `Quotation "${quotation.title}" status updated to ${status}`,
    });

    res.json(quotation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};