// Utility functions with Indian currency
function formatIndianPrice(price) {
    return '₹' + price.toLocaleString('en-IN');
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    
    toast.className = `${bgColor} text-white px-6 py-3 rounded-lg shadow-lg mb-3 flex items-center gap-2 animate-slideIn`;
    toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateCounts() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const cartCountElem = document.getElementById('cartCount');
    const wishlistCountElem = document.getElementById('wishlistCount');
    if (cartCountElem) cartCountElem.textContent = cart.length;
    if (wishlistCountElem) wishlistCountElem.textContent = wishlist.length;
}

async function loadProducts() {
    try {
        const response = await fetch('data/products.json');
        const data = await response.json();
        const products = data.products || data;
        localStorage.setItem('products', JSON.stringify(products));
        return products;
    } catch (error) {
        console.error('Error loading products:', error);
        // Fallback products
        const fallback = [
            { id: 1, name: "Classic White Tee", price: 1299, originalPrice: 2499, discount: 48, rating: 4.5, category: "mens", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", sizes: ["S","M","L","XL"], brand: "UrbanThreads" },
            { id: 2, name: "Slim Fit Jeans", price: 2499, originalPrice: 4999, discount: 50, rating: 4.7, category: "mens", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400", sizes: ["30","32","34"], brand: "DenimCo" },
            { id: 3, name: "Summer Floral Dress", price: 3499, originalPrice: 6999, discount: 50, rating: 4.8, category: "womens", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400", sizes: ["XS","S","M","L"], brand: "Bloom" },
            { id: 4, name: "Leather Jacket", price: 5999, originalPrice: 12999, discount: 54, rating: 4.9, category: "mens", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400", sizes: ["M","L","XL"], brand: "UrbanThreads" }
        ];
        localStorage.setItem('products', JSON.stringify(fallback));
        return fallback;
    }
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    .animate-slideIn {
        animation: slideIn 0.3s ease forwards;
    }
`;
document.head.appendChild(style);