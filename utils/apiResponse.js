/**
 * Send success response
 */
const sendSuccess = (res, data, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Send error response
 */
const sendError = (res, message = 'Something went wrong', statusCode = 400) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};

/**
 * Send paginated response
 */
const sendPaginated = (res, data, pagination, message = 'Success') => {
  res.status(200).json({
    success: true,
    message,
    data,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      pages: Math.ceil(pagination.total / pagination.limit),
    },
  });
};

// ✅ Fixed: Changed ES module 'export' syntax to CommonJS 'module.exports'
module.exports = { sendSuccess, sendError, sendPaginated };
