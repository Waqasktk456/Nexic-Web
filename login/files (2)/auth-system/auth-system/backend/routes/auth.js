const express = require('express');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

// Sign a JWT for a given user id
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
};

// Throttle login attempts to slow down brute-force/credential-stuffing attacks
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 attempts per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. Please try again in a few minutes.',
  },
});

/* ------------------------------------------------------------------ */
/*  POST /api/auth/register                                            */
/* ------------------------------------------------------------------ */
router.post(
  '/register',
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 2, max: 60 })
      .withMessage('Name must be between 2 and 60 characters'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: errors.array()[0].msg,
          errors: errors.array(),
        });
      }

      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          field: 'email',
          message: 'An account with this email already exists',
        });
      }

      const user = await User.create({ name, email, password });

      const token = generateToken(user._id);

      return res.status(201).json({
        success: true,
        message: 'Account created successfully',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

/* ------------------------------------------------------------------ */
/*  POST /api/auth/login                                               */
/* ------------------------------------------------------------------ */
router.post(
  '/login',
  loginLimiter,
  [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: errors.array()[0].msg,
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;

      // Explicitly select password since the schema excludes it by default
      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        return res.status(401).json({
          success: false,
          field: 'email',
          message: 'No account found with this email',
        });
      }

      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          field: 'password',
          message: 'Incorrect password',
        });
      }

      const token = generateToken(user._id);

      return res.status(200).json({
        success: true,
        message: 'Logged in successfully',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

/* ------------------------------------------------------------------ */
/*  GET /api/auth/me  (protected — future-ready)                       */
/* ------------------------------------------------------------------ */
router.get('/me', protect, async (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      createdAt: req.user.createdAt,
    },
  });
});

module.exports = router;
