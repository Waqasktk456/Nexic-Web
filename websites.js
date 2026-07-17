// backend/routes/websites.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Website = require('../models/Website');

const JWT_SECRET = process.env.JWT_SECRET || 'webvault_secret_change_this';

// Auth middleware
const protect = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer '))
    return res.status(401).json({ message: 'Unauthorized.' });
  try {
    const decoded = jwt.verify(auth.split(' ')[1], JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

// ---- GET /api/websites — list with search, filter, pagination ----
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 9, category, search } = req.query;
    const query = { active: true };

    if (category && category !== 'all') query.category = category;
    if (search) query.$text = { $search: search };

    const total = await Website.countDocuments(query);
    const websites = await Website.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ websites, total, pages: Math.ceil(total / limit), currentPage: parseInt(page) });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// ---- GET /api/websites/:id ----
router.get('/:id', async (req, res) => {
  try {
    const website = await Website.findById(req.params.id);
    if (!website) return res.status(404).json({ message: 'Website not found.' });
    res.json(website);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// ---- POST /api/websites — admin: add website ----
// 👉 ADD NEW WEBSITE HERE — POST to this endpoint with website data
router.post('/', protect, async (req, res) => {
  try {
    const { title, image, description, link, category, price } = req.body;
    const website = await Website.create({ title, image, description, link, category, price });
    res.status(201).json(website);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ---- PUT /api/websites/:id — admin: update ----
router.put('/:id', protect, async (req, res) => {
  try {
    const website = await Website.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!website) return res.status(404).json({ message: 'Website not found.' });
    res.json(website);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ---- DELETE /api/websites/:id — admin: soft delete ----
router.delete('/:id', protect, async (req, res) => {
  try {
    await Website.findByIdAndUpdate(req.params.id, { active: false });
    res.json({ message: 'Website removed.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;




