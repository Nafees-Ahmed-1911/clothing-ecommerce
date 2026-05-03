// Cart functionality
function addToCart(productId, quantity = 1, size = 'M') {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const product = products.find(p => p.id == productId);
    
    const existingItem = cart.find(item => item.id == productId && item.size === size);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity, size });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCounts();
    showToast('Added to cart!', 'success');
}

function removeFromCart(productId, size) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter(item => !(item.id == productId && item.size === size));
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCounts();
    if (window.location.pathname.includes('cart.html')) location.reload();
}

function updateQuantity(productId, size, newQuantity) {
    if (newQuantity < 1) return;
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const item = cart.find(i => i.id == productId && i.size === size);
    if (item) item.quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCounts();
}

// Add to cart with size and quantity
function addToCart(productId, quantity = 1, size = 'M') {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const product = products.find(p => p.id == productId);
    
    if (!product) {
        showToast('Product not found', 'error');
        return;
    }
    
    const existingItem = cart.find(item => item.id == productId && item.size === size);
    if (existingItem) {
        existingItem.quantity += quantity;
        showToast(`Added another ${product.name} to cart!`, 'success');
    } else {
        cart.push({ 
            ...product, 
            quantity, 
            size,
            image: product.image,
            price: product.price,
            originalPrice: product.originalPrice,
            discount: product.discount,
            name: product.name
        });
        showToast(`${product.name} added to cart!`, 'success');
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCounts();
}

function removeFromCart(productId, size) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter(item => !(item.id == productId && item.size === size));
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCounts();
    if (window.location.pathname.includes('cart.html')) location.reload();
    showToast('Item removed from cart', 'info');
}