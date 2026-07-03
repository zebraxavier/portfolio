const Message = require('../models/Message');

/**
 * POST /api/contact
 * Public — saves a contact message to MongoDB.
 */
const sendMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    // Store client IP for abuse tracking (not exposed in public API)
    const ip =
      req.headers['x-forwarded-for']?.split(',')[0].trim() ||
      req.socket.remoteAddress;

    const newMessage = await Message.create({ name, email, message, ip });

    res.status(201).json({
      success: true,
      message: 'Message received. Thank you for reaching out!',
      id: newMessage._id,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/contact
 * Admin only — paginated list of all messages.
 */
const getMessages = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      Message.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Message.countDocuments(),
    ]);

    res.json({
      success: true,
      data: messages,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { sendMessage, getMessages };
