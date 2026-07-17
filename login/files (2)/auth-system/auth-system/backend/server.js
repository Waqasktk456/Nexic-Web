require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();

/* ------------------------------------------------------------------ */
/*  Database                                                           */
/* ------------------------------------------------------------------ */
connectDB();

/* ------------------------------------------------------------------ */
/*  Core middleware                                                    */
/* ------------------------------------------------------------------ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
  })
);

/* ------------------------------------------------------------------ */
/*  Routes                                                             */
/* ------------------------------------------------------------------ */
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is running' });
});

app.use('/api/auth', authRoutes);

/* ------------------------------------------------------------------ */
/*  404 handler                                                        */
/* ------------------------------------------------------------------ */
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

/* ------------------------------------------------------------------ */
/*  Centralized error handler                                          */
/* ------------------------------------------------------------------ */
app.use((err, req, res, _next) => {
  console.error(err.stack);

  // Handle Mongoose duplicate key errors (e.g. unique email)
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'An account with this email already exists',
    });
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
    return res.status(400).json({ success: false, message });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

/* ------------------------------------------------------------------ */
/*  Start server                                                       */
/* ------------------------------------------------------------------ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
