const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  action: {
    type: String,
    required: true,
    enum: ['create', 'update', 'delete', 'view', 'approve', 'reject', 'login', 'logout'],
  },
  entityType: {
    type: String,
    required: true,
    enum: ['vendor', 'quotation', 'user'],
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  details: {
    type: String,
    trim: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.ActivityLog || mongoose.model('ActivityLog', activityLogSchema);