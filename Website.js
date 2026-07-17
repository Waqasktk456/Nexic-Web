// backend/models/Website.js
// Optional: use this if you want websites stored in DB instead of JS array

const mongoose = require('mongoose');

const WebsiteSchema = new mongoose.Schema({
  // 👉 ADD NEW WEBSITE HERE — via POST /api/websites (admin only)
  title: { type: String, required: true, trim: true },
  image: { type: String, default: '' },          // 👉 CHANGE IMAGE HERE
  description: { type: String, required: true },
  link: { type: String, required: true },        // 👉 ADD WEBSITE LINK HERE
  category: {
    type: String,
    enum: ['ecommerce', 'saas', 'portfolio', 'blog', 'landing', 'agency'],
    required: true
  },
  price: { type: String, default: '৳0' },
  featured: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

// Full-text search index
WebsiteSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Website', WebsiteSchema);
