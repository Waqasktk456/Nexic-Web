// =============================================
// WebVault — Backend Server
// server.js
// =============================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// ---- Middleware ----
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'public')));

// ---- Database ----
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/webvault', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
});

// ---- Routes ----
app.use('/api/auth', require('./routes/auth'));
app.use('/api/websites', require('./routes/websites'));

// ---- Catch-all → serve frontend ----
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ---- Start ----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 WebVault server running on http://localhost:${PORT}`);
});
