const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * POST /api/auth/login
 * Admin login — credentials checked against env vars (no DB needed for single-admin portfolio).
 * In a multi-user system you'd swap this for a User model lookup.
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminEmail || !adminPasswordHash) {
      return res
        .status(503)
        .json({ success: false, message: 'Admin credentials not configured' });
    }

    if (email !== adminEmail) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, adminPasswordHash);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { email: adminEmail, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ success: true, token });
  } catch (err) {
    next(err);
  }
};

module.exports = { login };
