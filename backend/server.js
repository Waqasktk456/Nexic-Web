const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

dotenv.config();

const app = express();

// CORS configuration - allow your frontend domain
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Update FRONTEND_URL in Render environment variables
  credentials: true
}));
app.use(express.json());

// Initialize Supabase Client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'NexicWeb API is running', status: 'connected' });
});

// Auth Routes
app.use('/api/auth', require('./routes/auth'));

// Websites Routes
app.use('/api/websites', require('./routes/websites'));

// Users Routes
app.use('/api/users', require('./routes/users'));

// Team Routes
app.use('/api/team', require('./routes/team'));

// Test Supabase Connection
app.get('/test-db', async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*').limit(1);
    if (error) throw error;
    res.json({ message: 'Database connected successfully', data });
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Supabase connected to: ${process.env.SUPABASE_URL}`);
});
