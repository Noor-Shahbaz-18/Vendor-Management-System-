const Quotation = require('../models/Quotation.model');

// @desc    Get all quotations for cross-vendor comparison
// @route   GET /api/comparison/all
// @access  Private
exports.getAllForComparison = async (req, res) => {
  try {
    const quotations = await Quotation.find()
      .populate('vendor', 'vendorName companyName email')
      .sort({ quotationAmount: 1 });

    if (quotations.length === 0) {
      return res.json({
        quotations: [],
        bestQuote: null,
        totalQuotations: 0,
        averageAmount: 0,
        highestAmount: 0,
        lowestAmount: 0,
      });
    }

    const bestQuote = quotations[0];
    const amounts = quotations.map((q) => q.quotationAmount);
    const averageAmount = amounts.reduce((sum, a) => sum + a, 0) / amounts.length;

    res.json({
      quotations,
      bestQuote,
      totalQuotations: quotations.length,
      averageAmount: parseFloat(averageAmount.toFixed(2)),
      highestAmount: Math.max(...amounts),
      lowestAmount: Math.min(...amounts),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Compare quotations for a specific vendor
// @route   GET /api/comparison/vendor/:vendorId
// @access  Private
exports.compareVendorQuotations = async (req, res) => {
  try {
    const { vendorId } = req.params;

    const quotations = await Quotation.find({ vendor: vendorId })
      .populate('vendor', 'vendorName companyName email')
      .sort({ quotationAmount: 1 });

    if (quotations.length === 0) {
      return res.status(404).json({ message: 'No quotations found for this vendor' });
    }

    const bestQuote = quotations[0];
    const amounts = quotations.map((q) => q.quotationAmount);

    res.json({
      quotations,
      bestQuote,
      totalQuotations: quotations.length,
      averageAmount: parseFloat((amounts.reduce((s, a) => s + a, 0) / amounts.length).toFixed(2)),
      highestAmount: Math.max(...amounts),
      lowestAmount: Math.min(...amounts),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};