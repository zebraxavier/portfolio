const express = require('express');
const { body } = require('express-validator');
const rateLimit = require('express-rate-limit');
const { login } = require('../controllers/authController');
const validate = require('../middleware/validate');

const router = express.Router();

// Brute-force protection on login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many login attempts. Try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const loginValidation = [
  body('email').trim().notEmpty().isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required'),
];

router.post('/login', loginLimiter, loginValidation, validate, login);

module.exports = router;
