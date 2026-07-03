/**
 * Centralized error handler middleware.
 * Keeps controllers clean — they just call next(err).
 */
const errorHandler = (err, req, res, _next) => {
  const status = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === 'production' && status === 500
      ? 'Internal server error'
      : err.message || 'Internal server error';

  if (process.env.NODE_ENV !== 'production') {
    console.error(`[${req.method}] ${req.path} → ${status}: ${err.message}`);
  }

  res.status(status).json({ success: false, message });
};

module.exports = errorHandler;
