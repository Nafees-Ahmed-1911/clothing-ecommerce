// Wishlist functionality
function toggleWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast('Removed from wishlist', 'info');
    } else {
        wishlist.push(productId);
        showToast('Added to wishlist!', 'success');
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateCounts();
    if (window.location.pathname.includes('wishlist.html')) renderWishlist();
}

function isInWishlist(productId) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    return wishlist.includes(productId);
}