// Validation middleware
const validateProduct = (req, res, next) => {
    const { name, price, category, location, description, seller, phone } = req.body;
    
    const errors = [];
    
    if (!name || name.trim().length === 0) {
        errors.push('Product name is required');
    }
    
    if (!price || isNaN(price) || price < 0) {
        errors.push('Valid price is required');
    }
    
    if (!category) {
        errors.push('Category is required');
    }
    
    if (!location || location.trim().length === 0) {
        errors.push('Location is required');
    }
    
    if (!description || description.trim().length === 0) {
        errors.push('Description is required');
    }
    
    if (!seller || seller.trim().length === 0) {
        errors.push('Seller name is required');
    }
    
    if (!phone || phone.trim().length === 0) {
        errors.push('Phone number is required');
    }
    
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    
    next();
};

module.exports = {
    validateProduct
};