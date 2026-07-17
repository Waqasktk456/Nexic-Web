const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Protects routes by requiring a valid JWT in the Authorization header.
 * Expected format: "Authorization: Bearer <token>"
 *
 * On success, attaches the authenticated user document to req.user
 * (without the password field) and calls next().
 */
const protect = async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization || '';

  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized — no token provided',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized — user no longer exists',
      });
    }

    req.user = user;
    next();
  } catch (err) {
    const message =
      err.name === 'TokenExpiredError'
        ? 'Session expired — please log in again'
        : 'Not authorized — invalid token';

    return res.status(401).json({ success: false, message });
  }
};

module.exports = { protect };
