require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/loopcart', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Simple Product Model - Add this directly in server.js
const Product = mongoose.model('Product', new mongoose.Schema({
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
}));

// SEED PRODUCTS ROUTE - Add this BEFORE other product routes
app.post('/api/seed-products', async (req, res) => {
    try {
        const sampleProducts = [
            {
                name: "iPhone 12 Pro",
                price: 45000,
                category: "electronics",
                location: "delhi",
                image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop",
                description: "Like new iPhone 12 Pro with 256GB storage. Includes original box and accessories. Used for 6 months.",
                seller: "Rahul Sharma",
                phone: "+919876543210",
                condition: "excellent",
                isAvailable: true
            },
            {
                name: "Wooden Study Table",
                price: 3500,
                category: "furniture",
                location: "mumbai",
                image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=300&h=200&fit=crop",
                description: "Solid wooden study table in excellent condition. Perfect for home office or student use.",
                seller: "Priya Patel",
                phone: "+919876543211",
                condition: "good",
                isAvailable: true
            },
            {
                name: "Designer Handbag",
                price: 8000,
                category: "clothing",
                location: "bangalore",
                image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=200&fit=crop",
                description: "Genuine leather handbag from a premium brand. Used only a few times. Original packaging included.",
                seller: "Anjali Mehta",
                phone: "+919876543212",
                condition: "excellent",
                isAvailable: true
            },
            {
                name: "JavaScript Book Collection",
                price: 1200,
                category: "books",
                location: "chennai",
                image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=200&fit=crop",
                description: "Set of 3 advanced JavaScript books for web developers. Perfect condition, no markings.",
                seller: "Vikram Singh",
                phone: "+919876543213",
                condition: "good",
                isAvailable: true
            },
            {
                name: "Sony Headphones",
                price: 5500,
                category: "electronics",
                location: "delhi",
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
                description: "Noise cancelling headphones with excellent sound quality. Includes original case and cables.",
                seller: "Neha Gupta",
                phone: "+919876543214",
                condition: "good",
                isAvailable: true
            },
            {
                name: "Leather Jacket",
                price: 3500,
                category: "clothing",
                location: "mumbai",
                image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=200&fit=crop",
                description: "Genuine leather jacket, size M. Perfect condition, worn only a few times.",
                seller: "Rohan Desai",
                phone: "+919876543215",
                condition: "excellent",
                isAvailable: true
            }
        ];

        // Clear existing and insert new products
        await Product.deleteMany({});
        await Product.insertMany(sampleProducts);
        
        console.log('✅ Sample products added to database');
        res.json({ 
            success: true,
            message: 'Sample products added successfully!', 
            count: sampleProducts.length 
        });
    } catch (error) {
        console.error('❌ Seed error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to seed products: ' + error.message 
        });
    }
});

// Simple products API route - Add this too
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json({
            products,
            totalPages: 1,
            currentPage: 1,
            totalProducts: products.length
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/cart.html'));
});

app.get('/wishlist', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/wishlist.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📁 Serving from: ${__dirname}`);
    console.log(`🌱 Add sample products: http://localhost:${PORT}/api/seed-products`);
    console.log(`📦 View products: http://localhost:${PORT}/api/products`);
});