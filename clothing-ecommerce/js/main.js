// Main initialization and hero slider
let currentSlide = 0;
const slides = [
    { bg: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&h=600&fit=crop", title: "Summer Collection 2024", subtitle: "Up to 50% off" },
    { bg: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&h=600&fit=crop", title: "Winter Essentials", subtitle: "Warm & Stylish" },
    { bg: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&h=600&fit=crop", title: "New Arrivals", subtitle: "Fresh styles every week" }
];

function updateSlide() {
    const slide = slides[currentSlide];
    const sliderDiv = document.querySelector('.hero-slide');
    if (sliderDiv) {
        sliderDiv.style.backgroundImage = `url('${slide.bg}')`;
        sliderDiv.querySelector('h1').textContent = slide.title;
        sliderDiv.querySelector('p').textContent = slide.subtitle;
    }
}

function nextSlide() { currentSlide = (currentSlide + 1) % slides.length; updateSlide(); }
function prevSlide() { currentSlide = (currentSlide - 1 + slides.length) % slides.length; updateSlide(); }

// Load featured products
async function loadFeaturedProducts() {
    const products = await loadProducts();
    const featured = products.slice(0, 4);
    const container = document.getElementById('featuredProducts');
    if (container) {
        container.innerHTML = featured.map(p => `
            <div class="product-card p-4 cursor-pointer" onclick="location.href='product-detail.html?id=${p.id}'">
                <img src="${p.image}" class="w-full h-64 object-cover rounded-xl mb-4">
                <h3 class="font-semibold">${p.name}</h3>
                <div class="flex items-center space-x-2 mt-2">
                    <span class="text-xl font-bold">$${p.price}</span>
                    <span class="text-gray-400 line-through">$${p.originalPrice}</span>
                    <span class="text-green-600">${p.discount}% off</span>
                </div>
                <div class="flex items-center mt-2">
                    ${'★'.repeat(Math.floor(p.rating))}${p.rating % 1 ? '½' : ''}
                    <span class="text-gray-500 ml-2">(${p.rating})</span>
                </div>
                <button onclick="event.stopPropagation(); addToCart(${p.id})" class="mt-4 w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 transition">Add to Cart</button>
            </div>
        `).join('');
    }
}

// Scroll animations with GSAP
function initScrollAnimations() {
    gsap.from('.category-card', { opacity: 0, y: 50, duration: 0.6, stagger: 0.2, scrollTrigger: { trigger: '.category-card', start: 'top 80%' } });
    gsap.from('.product-card', { opacity: 0, scale: 0.9, duration: 0.5, stagger: 0.1, scrollTrigger: { trigger: '#featuredProducts', start: 'top 80%' } });
}

// Back to top button visibility
window.addEventListener('scroll', () => {
    const btn = document.getElementById('backToTop');
    if (btn) btn.classList.toggle('hidden', window.scrollY < 300);
});

// Auto slide every 5 seconds
setInterval(nextSlide, 5000);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
    initScrollAnimations();
    updateCounts();
});