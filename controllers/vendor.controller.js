const Vendor = require('../models/Vendor.model');
const ActivityLog = require('../models/ActivityLog.model');
const { validationResult } = require('express-validator');

// @desc    Create vendor
// @route   POST /api/vendors
// @access  Private
exports.createVendor = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const vendor = await Vendor.create(req.body);

    // Log activity
    await ActivityLog.create({
      user: req.user._id,
      action: 'create',
      entityType: 'vendor',
      entityId: vendor._id,
      details: `Vendor ${vendor.vendorName} created`,
    });

    res.status(201).json(vendor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all vendors
// @route   GET /api/vendors
// @access  Private
exports.getVendors = async (req, res) => {
  try {
    const { search, sort, order = 'asc' } = req.query;
    let query = {};

    // Search functionality
    if (search) {
      query.$or = [
        { vendorName: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    let sortOption = {};
    if (sort) {
      sortOption[sort] = order === 'desc' ? -1 : 1;
    } else {
      sortOption = { createdAt: -1 };
    }

    const vendors = await Vendor.find(query).sort(sortOption);
    res.json(vendors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single vendor
// @route   GET /api/vendors/:id
// @access  Private
exports.getVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    // Log activity
    await ActivityLog.create({
      user: req.user._id,
      action: 'view',
      entityType: 'vendor',
      entityId: vendor._id,
      details: `Vendor ${vendor.vendorName} viewed`,
    });

    res.json(vendor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update vendor
// @route   PUT /api/vendors/:id
// @access  Private
exports.updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // Log activity
    await ActivityLog.create({
      user: req.user._id,
      action: 'update',
      entityType: 'vendor',
      entityId: vendor._id,
      details: `Vendor ${vendor.vendorName} updated`,
    });

    res.json(updatedVendor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete vendor
// @route   DELETE /api/vendors/:id
// @access  Private
exports.deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    await vendor.deleteOne();

    // Log activity
    await ActivityLog.create({
      user: req.user._id,
      action: 'delete',
      entityType: 'vendor',
      entityId: vendor._id,
      details: `Vendor ${vendor.vendorName} deleted`,
    });

    res.json({ message: 'Vendor removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};