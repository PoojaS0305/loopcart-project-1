// Wishlist functionality
let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];

// Function to add item to wishlist
function addToWishlist(product) {
    // Check if product is already in wishlist
    const existingItem = wishlistItems.find(item => item.id === product.id);
    
    if (!existingItem) {
        wishlistItems.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
        updateWishlistCount();
        return true;
    }
    return false;
}

// Function to remove item from wishlist
function removeFromWishlist(itemId) {
    const itemIndex = wishlistItems.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        wishlistItems.splice(itemIndex, 1);
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
        renderWishlist();
        updateWishlistCount();
        return true;
    }
    return false;
}

// Function to check if item is in wishlist
function isInWishlist(productId) {
    return wishlistItems.some(item => item.id === productId);
}

// Function to render wishlist items
function renderWishlist() {
    const wishlistContainer = document.getElementById('wishlistItems');
    
    if (!wishlistContainer) return; // Exit if not on wishlist page
    
    console.log('Wishlist items:', wishlistItems); // Debug log
    
    if (wishlistItems.length === 0) {
        // Show empty state if no items
        wishlistContainer.innerHTML = `
            <div class="empty-wishlist">
                <div class="empty-wishlist-icon">❤️</div>
                <h3>Your wishlist is empty</h3>
                <p>Start adding items to your wishlist by clicking the heart icon!</p>
                <a href="index.html" class="btn btn-primary btn-large">Browse Products</a>
            </div>
        `;
    } else {
        // Render wishlist items
        wishlistContainer.innerHTML = wishlistItems.map(item => `
            <div class="wishlist-item" data-id="${item.id}">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/300x300?text=Product+Image'">
                </div>
                <div class="item-details">
                    <h3 class="item-title">${item.name}</h3>
                    <div class="item-price">$${item.price ? item.price.toFixed(2) : '0.00'}</div>
                    <div class="item-actions">
                        <button class="btn btn-primary add-to-cart-btn" onclick="addToCartFromWishlist(${item.id})">Add to Cart</button>
                        <button class="btn btn-danger remove-btn" onclick="removeFromWishlist(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Function to update wishlist count in header
function updateWishlistCount() {
    const wishlistCounts = document.querySelectorAll('.wishlist-count');
    const count = wishlistItems.length;
    
    console.log('Updating wishlist count:', count); // Debug log
    
    wishlistCounts.forEach(countElement => {
        countElement.textContent = count;
        countElement.style.display = count > 0 ? 'inline' : 'none';
    });
    
    // Also update heart icons on product cards
    updateProductHeartIcons();
}

// Function to update heart icons on product cards
function updateProductHeartIcons() {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        const productId = parseInt(btn.getAttribute('data-product-id'));
        if (isInWishlist(productId)) {
            btn.innerHTML = '❤️'; // Filled heart
            btn.style.color = '#ff4757';
        } else {
            btn.innerHTML = '🤍'; // Outline heart
            btn.style.color = '#333';
        }
    });
}

// Function to add to cart from wishlist
function addToCartFromWishlist(productId) {
    const item = wishlistItems.find(item => item.id === productId);
    if (item) {
        // Call your existing addToCart function
        if (typeof addToCart === 'function') {
            addToCart(item);
            alert(`Added ${item.name} to cart!`);
        } else {
            alert(`Added ${item.name} to cart! (Cart integration needed)`);
        }
    }
}

// Initialize wishlist functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load wishlist items from localStorage
    wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Render wishlist if on wishlist page
    renderWishlist();
    
    // Update wishlist count
    updateWishlistCount();
    
    // Add event listeners to wishlist buttons on product cards
    setTimeout(() => {
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-product-id'));
                const product = getProductById(productId);
                
                if (product) {
                    if (isInWishlist(productId)) {
                        removeFromWishlist(productId);
                        this.innerHTML = '🤍';
                        this.style.color = '#333';
                    } else {
                        if (addToWishlist(product)) {
                            this.innerHTML = '❤️';
                            this.style.color = '#ff4757';
                        }
                    }
                }
            });
        });
    }, 100);
});

// Helper function to get product by ID (you'll need to implement this based on your products.js)
function getProductById(productId) {
    // This should return your product object from your products data
    // You'll need to modify this based on how your products are stored
    if (typeof products !== 'undefined') {
        return products.find(p => p.id === productId);
    }
    
    // Fallback - you'll need to implement this properly
    console.warn('getProductById not fully implemented');
    return {
        id: productId,
        name: 'Product ' + productId,
        price: 0,
        image: 'https://via.placeholder.com/300x300?text=Product'
    };
}