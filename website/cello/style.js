// --- 1. EXISTING SLIDER LOGIC ---
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');

function setSlide(index) {
    if(slides.length === 0) return;
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

setInterval(() => {
    if(slides.length > 0){
        let next = (currentSlide + 1) % slides.length;
        setSlide(next);
    }
}, 5000);

// --- 2. EXISTING DYNAMIC PRODUCTS GENERATION ---
const productsData = [
    { name: "Sony WH-1000XM4 Noise Canceling", img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=300&q=80", price: 298.00, oldPrice: 349.00, sale: true },
    { name: "Apple iPhone 14 Pro Max - 256GB", img: "https://gadgetbd.com/wp-content/uploads/2022/09/iPhone-14-Pro-Max-All-Colors.jpg", price: 1099.00, oldPrice: 1199.00, sale: false },
    { name: "Samsung Galaxy Watch 5 Pro", img: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=300&q=80", price: 279.00, oldPrice: 329.00, sale: true },
    { name: "MacBook Air M2 Chip 2022", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80", price: 999.00, oldPrice: 1199.00, sale: true },
    { name: "Logitech MX Master 3S Mouse", img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=300&q=80", price: 99.00, oldPrice: null, sale: false }
];

function createProductHTML(p) {
    return `
        <div class="product-card">
            ${p.sale ? '<div class="badge">Sale</div>' : ''}
            <button class="quick-view"><i class="far fa-eye"></i></button>
            <img src="${p.img}" alt="${p.name}" class="product-img">
            <h3 class="product-title">${p.name}</h3>
            <div class="product-price">
                <span class="new-price">$${p.price.toFixed(2)}</span>
                ${p.oldPrice ? `<span class="old-price">$${p.oldPrice.toFixed(2)}</span>` : ''}
            </div>
            <div class="card-bottom">
                <div class="colors">
                    <div class="color-dot" style="background: #000;"></div>
                    <div class="color-dot" style="background: #ddd;"></div>
                    <div class="color-dot" style="background: #0d1b2a;"></div>
                </div>
                <button class="add-cart-btn"><i class="fas fa-plus"></i></button>
            </div>
        </div>
    `;
}

document.getElementById('product-container').innerHTML = productsData.map(createProductHTML).join('');
document.getElementById('deal-container').innerHTML = productsData.slice(0, 4).map(createProductHTML).join('');

// --- 3. EXISTING CART FUNCTIONALITY (LocalStorage) ---
let cartCount = parseInt(localStorage.getItem('cello_cartCount')) || 0;
const cartBadge = document.getElementById('cart-count');

function updateCartUI() {
    cartBadge.innerText = cartCount;
    // Simple animation bump
    cartBadge.style.transform = 'scale(1.5)';
    setTimeout(() => cartBadge.style.transform = 'scale(1)', 200);
}

updateCartUI(); // Initial load

document.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        cartCount++;
        localStorage.setItem('cello_cartCount', cartCount);
        updateCartUI();
    });
});

// --- 4. EXISTING COUNTDOWN TIMER ---
const countDownDate = new Date();
countDownDate.setDate(countDownDate.getDate() + 1);
countDownDate.setHours(15, 30, 0, 0); 
const targetTime = countDownDate.getTime();

const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = targetTime - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const elDays = document.getElementById("days");
    if(elDays) {
        elDays.innerHTML = days.toString().padStart(2, '0');
        document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
        document.getElementById("mins").innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById("secs").innerHTML = seconds.toString().padStart(2, '0');
    }

    if (distance < 0) {
        clearInterval(x);
        const timerObj = document.querySelector(".timer");
        if(timerObj) timerObj.innerHTML = "<div class='time-box'><span>EXPIRED</span></div>";
    }
}, 1000);


// =========================================
// NEW ADDITIONS LOGIC
// =========================================

// A. Dynamically append Luxury Footwear to align with premium brand aesthetics
const luxuryProducts = [
    { name: "Cello X1 Elite Low - Triple White", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=300&q=80", price: 345.00, oldPrice: null, sale: false },
    { name: "Streetwear Retro High - Obsidian", img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=300&q=80", price: 420.00, oldPrice: 480.00, sale: true },
    { name: "Cello Phantom Runner Series", img: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=300&q=80", price: 285.00, oldPrice: null, sale: false },
    { name: "Luxury Court Classic - Leather", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=300&q=80", price: 550.00, oldPrice: null, sale: false },
    { name: "Urban Athletic Pro - Volt", img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=300&q=80", price: 210.00, oldPrice: 250.00, sale: true }
];

document.getElementById('luxury-container').innerHTML = luxuryProducts.map(createProductHTML).join('');


// B. Product Detail Page Overlay Logic (Event Delegation ensures we don't break existing code)
document.addEventListener('click', function(e) {
    // Check if clicked inside a product card
    const card = e.target.closest('.product-card');
    
    // Ignore if clicked on the specific add-to-cart button so existing logic works
    if (e.target.closest('.add-cart-btn')) {
        return; 
    }

    if (card) {
        // Extract data visually from the card
        const imgSrc = card.querySelector('.product-img').src;
        const title = card.querySelector('.product-title').innerText;
        const priceText = card.querySelector('.new-price').innerText;
        
        openProductView(imgSrc, title, priceText);
    }
});

function openProductView(imgUrl, title, price) {
    document.getElementById('modal-main-img').src = imgUrl;
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-price').innerText = price;
    
    // Reset Qty
    document.getElementById('modal-qty').value = 1;

    // Show Modal
    const modal = document.getElementById('product-detail-modal');
    modal.classList.remove('hidden'); // fail-safe if hidden class was heavily styled
    modal.style.display = "flex";
    // Slight delay to allow display:flex to register before opacity transition
    setTimeout(() => {
        modal.classList.add('active');
        document.body.style.overflow = "hidden"; // Prevent background scrolling
    }, 10);
}

function closeProductView() {
    const modal = document.getElementById('product-detail-modal');
    modal.classList.remove('active');
    document.body.style.overflow = "auto"; // Restore scrolling
    
    setTimeout(() => {
        modal.style.display = "none";
    }, 400); // Wait for transition
}

// C. Product Modal Interaction Logic
function updateQty(change) {
    const qtyInput = document.getElementById('modal-qty');
    let current = parseInt(qtyInput.value);
    if (current + change > 0) {
        qtyInput.value = current + change;
    }
}

function addModalToCart() {
    const qty = parseInt(document.getElementById('modal-qty').value);
    cartCount += qty;
    localStorage.setItem('cello_cartCount', cartCount);
    updateCartUI();
    
    // Visual feedback
    const btn = document.querySelector('.modal-add-cart');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Added! <i class="fas fa-check"></i>';
    btn.style.background = "#2e7d32";
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = "var(--primary)";
        closeProductView();
    }, 1000);
}

// Variant selection visual logic
document.querySelectorAll('.variant-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});