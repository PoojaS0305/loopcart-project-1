require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// =========================
// Middleware
// =========================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// MongoDB Connection
// =========================
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/loopcart', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// =========================
// Product Model
// =========================
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  location: String,
  image: String,
  description: String,
  seller: String,
  phone: String,
  condition: String,
  isAvailable: Boolean
});

const Product = mongoose.model('Product', ProductSchema);

// =========================
// API Routes
// =========================
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

// =========================
// FRONTEND SERVE (IMPORTANT)
// =========================

// Path: backend/server.js → "../frontend/"
const FRONTEND_PATH = path.join(__dirname, '../frontend');

// Serve frontend files
app.use(express.static(FRONTEND_PATH));

// For any route not starting with /api — return index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(FRONTEND_PATH, 'index.html'));
});

// =========================
// Start the Server
// =========================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Serving frontend from: ${FRONTEND_PATH}`);
});
