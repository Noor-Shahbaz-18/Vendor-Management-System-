const Vendor = require('../models/Vendor.model');
const Quotation = require('../models/Quotation.model');
const ActivityLog = require('../models/Activitylog.model'); // ✅ Fixed: consistent lowercase 'l'

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private
exports.getStats = async (req, res) => {
  try {
    const totalVendors = await Vendor.countDocuments();
    const totalQuotations = await Quotation.countDocuments();

    // ✅ Fixed: "Active Quotations" = received + reviewed (in-progress, not yet closed)
    const activeQuotations = await Quotation.countDocuments({
      status: { $in: ['received', 'reviewed'] },
    });

    const pendingQuotations = await Quotation.countDocuments({ status: 'pending' });
    const approvedQuotations = await Quotation.countDocuments({ status: 'approved' });

    // Recent activities
    const recentActivities = await ActivityLog.find()
      .populate('user', 'name')
      .sort({ timestamp: -1 })
      .limit(10);

    res.json({
      totalVendors,
      totalQuotations,
      activeQuotations,   // ✅ New: received + reviewed
      pendingQuotations,
      approvedQuotations,
      recentActivities,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get quotation status distribution
// @route   GET /api/dashboard/status-distribution
// @access  Private
exports.getStatusDistribution = async (req, res) => {
  try {
    const distribution = await Quotation.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(distribution);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
