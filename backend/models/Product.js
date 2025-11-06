const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price cannot be negative']
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
        enum: {
            values: ['electronics', 'furniture', 'clothing', 'books', 'sports', 'other'],
            message: 'Category must be one of: electronics, furniture, clothing, books, sports, other'
        }
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true
    },
    image: {
        type: String,
        required: [true, 'Product image is required'],
        default: 'https://via.placeholder.com/300x200?text=Product+Image'
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    seller: {
        type: String,
        required: [true, 'Seller name is required'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Seller phone number is required'],
        match: [/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number']
    },
    condition: {
        type: String,
        enum: {
            values: ['excellent', 'good', 'fair', 'poor'],
            message: 'Condition must be one of: excellent, good, fair, poor'
        },
        default: 'good'
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
productSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Product', productSchema);