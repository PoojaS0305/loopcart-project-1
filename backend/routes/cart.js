const express = require('express');
const router = express.Router();

// In-memory cart storage (in production, use database)
let cartItems = [];

// GET all cart items
router.get('/', (req, res) => {
    res.json({
        items: cartItems,
        totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    });
});

// POST add item to cart
router.post('/', (req, res) => {
    try {
        const { productId, name, price, image, location, quantity = 1 } = req.body;
        
        if (!productId || !name || !price) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const existingItem = cartItems.find(item => item.productId === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cartItems.push({
                productId,
                name,
                price: parseFloat(price),
                image: image || 'https://via.placeholder.com/100x100?text=Product',
                location: location || 'Unknown',
                quantity: parseInt(quantity),
                addedAt: new Date()
            });
        }
        
        res.json({
            message: 'Item added to cart',
            items: cartItems,
            totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0)
        });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Failed to add item to cart' });
    }
});

// PUT update cart item quantity
router.put('/:productId', (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        
        const item = cartItems.find(item => item.productId === productId);
        if (!item) {
            return res.status(404).json({ error: 'Item not found in cart' });
        }
        
        if (quantity < 1) {
            return res.status(400).json({ error: 'Quantity must be at least 1' });
        }
        
        item.quantity = parseInt(quantity);
        
        res.json({
            message: 'Cart updated',
            items: cartItems,
            totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0)
        });
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ error: 'Failed to update cart' });
    }
});

// DELETE remove item from cart
router.delete('/:productId', (req, res) => {
    try {
        const { productId } = req.params;
        const initialLength = cartItems.length;
        
        cartItems = cartItems.filter(item => item.productId !== productId);
        
        if (cartItems.length === initialLength) {
            return res.status(404).json({ error: 'Item not found in cart' });
        }
        
        res.json({
            message: 'Item removed from cart',
            items: cartItems,
            totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0)
        });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ error: 'Failed to remove item from cart' });
    }
});

// DELETE clear entire cart
router.delete('/', (req, res) => {
    try {
        cartItems = [];
        res.json({ message: 'Cart cleared successfully' });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ error: 'Failed to clear cart' });
    }
});

module.exports = router;