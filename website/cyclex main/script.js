// ============================================================
// CYCLE X — Core JavaScript
// ============================================================

// ─── PRODUCT DATA ────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: "Phantom S1",
    category: "sport",
    categoryLabel: "Sport",
    price: 4299,
    rating: 4.9,
    reviews: 214,
    badge: "Best Seller",
    description:
      "The Phantom S1 is engineered for those who treat every road as a racetrack. Forged from aerospace-grade carbon fibre, it weighs just 6.8 kg while delivering race-tuned precision through every bend. Shimano Dura-Ace Di2 electronic shifting ensures seamless gear transitions, and the aerodynamic frame geometry cuts through headwinds with authority. Whether you're sprinting at dawn or conquering a century ride, the Phantom S1 is your unfair advantage.",
    images: [
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=900&q=90&fit=crop",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=900&q=90&fit=crop",
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94946?w=900&q=90&fit=crop",
    ],
    colors: ["#1a1a1a", "#c0392b", "#2c3e50"],
    colorNames: ["Stealth Black", "Crimson Red", "Midnight Blue"],
    specs: { weight: "6.8 kg", speed: "55 km/h", range: "Road" },
    featured: true,
  },
  {
    id: 2,
    name: "Nova Urban X",
    category: "urban",
    categoryLabel: "Urban",
    price: 2199,
    rating: 4.7,
    reviews: 183,
    badge: "New",
    description:
      "Built for the city that never sleeps. The Nova Urban X fuses minimalist Scandinavian aesthetics with urban practicality — integrated fender mounts, concealed cable routing, and puncture-resistant tyres make it the ultimate everyday commuter. The chromoly steel frame absorbs road vibration while the Gates Carbon Drive belt system runs maintenance-free for years. Arrives ready to ride; leave the tools at home.",
    images: [
      "https://images.unsplash.com/photo-1571188654248-7a89213915f7?w=900&q=90&fit=crop",
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=900&q=90&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=90&fit=crop",
    ],
    colors: ["#f5f0eb", "#2d2d2d", "#4a7c59"],
    colorNames: ["Pearl White", "Carbon Black", "Forest Green"],
    specs: { weight: "9.2 kg", speed: "30 km/h", range: "City" },
    featured: true,
  },
  {
    id: 3,
    name: "Volt E-Pro",
    category: "electric",
    categoryLabel: "Electric",
    price: 6799,
    rating: 5.0,
    reviews: 97,
    badge: "Premium",
    description:
      "The Volt E-Pro redefines what an electric bicycle can be. A whisper-quiet Bosch Performance Line CX mid-drive motor delivers 85 Nm of torque, propelling you up 25% gradients with ease, while the 625 Wh integrated battery provides up to 130 km of assisted range. The custom alloy frame hides every wire and the battery flush within its lines — it just looks like a very beautiful bicycle. Smart connectivity via the Kiox 300 display tracks power zones, navigation, and battery health in real time.",
    images: [
      "https://images.unsplash.com/photo-1622185135505-2d795003994a?w=900&q=90&fit=crop",
      "https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?w=900&q=90&fit=crop",
      "https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=900&q=90&fit=crop",
    ],
    colors: ["#0d0d0d", "#d4af37", "#1a3a5c"],
    colorNames: ["Obsidian", "Champagne Gold", "Navy Storm"],
    specs: { weight: "21 kg", speed: "45 km/h", range: "130 km" },
    featured: true,
  },
  {
    id: 4,
    name: "Aero R7",
    category: "sport",
    categoryLabel: "Sport",
    price: 5499,
    rating: 4.8,
    reviews: 142,
    badge: "",
    description:
      "Aero R7 is a wind-tunnel-optimised road weapon that started life in computational fluid dynamics simulations and finished on the velodrome. Every tube profile, every transition, every dropout is shaped to minimise drag without sacrificing stiffness. SRAM Red AXS wireless groupset delivers sub-50ms shift actuation. This is the bike that gets you onto the podium.",
    images: [
      "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=900&q=90&fit=crop",
      "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=900&q=90&fit=crop",
      "https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=900&q=90&fit=crop",
    ],
    colors: ["#ffffff", "#1a1a1a", "#7b2d8b"],
    colorNames: ["Arctic White", "Stealth", "Deep Violet"],
    specs: { weight: "7.1 kg", speed: "60 km/h", range: "Road" },
    featured: false,
  },
  {
    id: 5,
    name: "Metro Glide",
    category: "urban",
    categoryLabel: "Urban",
    price: 1649,
    rating: 4.6,
    reviews: 261,
    badge: "",
    description:
      "Effortless style for the urban explorer. The Metro Glide's swept-back handlebars and upright geometry put you in command of the street, while the 7-speed Shimano Nexus internal hub keeps your drivetrain clean and reliable through all seasons. Matte finishes on premium butted aluminium tubing make every ride feel like a gallery piece in motion.",
    images: [
      "https://images.unsplash.com/photo-1519583272095-6433daf26b6e?w=900&q=90&fit=crop",
      "https://images.unsplash.com/photo-1505705694340-019e1e335916?w=900&q=90&fit=crop",
      "https://images.unsplash.com/photo-1508789773961-2c7a6ef1b59d?w=900&q=90&fit=crop",
    ],
    colors: ["#b5651d", "#2c2c2c", "#c0c0c0"],
    colorNames: ["Copper Dust", "Matte Black", "Silver Mist"],
    specs: { weight: "11.5 kg", speed: "28 km/h", range: "City" },
    featured: false,
  },
  {
    id: 6,
    name: "Surge E-Trail",
    category: "electric",
    categoryLabel: "Electric",
    price: 5199,
    rating: 4.9,
    reviews: 78,
    badge: "Hot",
    description:
      "Off-road meets on-road with the Surge E-Trail's full-suspension platform and Shimano EP8 motor system. 150 mm of travel front and rear absorbs technical terrain while the 504 Wh downtube battery keeps you out on the trail for up to 90 km. Four assist modes let you dial in the experience from trail-natural to full-send, and the dropper post integrates invisibly into the frame.",
    images: [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=900&q=90&fit=crop",
      "https://images.unsplash.com/photo-1452421045895-5f6a55b0e31c?w=900&q=90&fit=crop",
      "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=900&q=90&fit=crop",
    ],
    colors: ["#1b4332", "#d62828", "#2d2d2d"],
    colorNames: ["Trail Green", "Ember Red", "Carbon"],
    specs: { weight: "23 kg", speed: "40 km/h", range: "90 km" },
    featured: false,
  },
];

// ─── CART ────────────────────────────────────────────────────
const Cart = (() => {
  let items = JSON.parse(localStorage.getItem("cx_cart") || "[]");

  function save() {
    localStorage.setItem("cx_cart", JSON.stringify(items));
  }

  function getAll() {
    return items;
  }

  function add(productId, qty = 1, color = 0) {
    const existing = items.find(
      (i) => i.productId === productId && i.color === color
    );
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ productId, qty, color });
    }
    save();
    CartUI.refresh();
    CartUI.open();
    CartUI.animateBadge();
  }

  function remove(productId, color) {
    items = items.filter(
      (i) => !(i.productId === productId && i.color === color)
    );
    save();
    CartUI.refresh();
  }

  function updateQty(productId, color, qty) {
    const item = items.find(
      (i) => i.productId === productId && i.color === color
    );
    if (item) {
      item.qty = Math.max(1, qty);
      save();
      CartUI.refresh();
    }
  }

  function total() {
    return items.reduce((sum, i) => {
      const p = PRODUCTS.find((p) => p.id === i.productId);
      return sum + (p ? p.price * i.qty : 0);
    }, 0);
  }

  function count() {
    return items.reduce((s, i) => s + i.qty, 0);
  }

  return { getAll, add, remove, updateQty, total, count };
})();

// ─── CART UI ─────────────────────────────────────────────────
const CartUI = (() => {
  function open() {
    const drawer = document.getElementById("cart-drawer");
    const overlay = document.getElementById("cart-overlay");
    if (drawer) drawer.classList.add("open");
    if (overlay) overlay.classList.add("visible");
    document.body.style.overflow = "hidden";
  }

  function close() {
    const drawer = document.getElementById("cart-drawer");
    const overlay = document.getElementById("cart-overlay");
    if (drawer) drawer.classList.remove("open");
    if (overlay) overlay.classList.remove("visible");
    document.body.style.overflow = "";
  }

  function animateBadge() {
    const badges = document.querySelectorAll(".cart-badge");
    badges.forEach((b) => {
      b.classList.remove("pop");
      void b.offsetWidth;
      b.classList.add("pop");
    });
  }

  function refresh() {
    const list = document.getElementById("cart-items-list");
    const totalEl = document.getElementById("cart-total");
    const badgeEls = document.querySelectorAll(".cart-badge");
    const items = Cart.getAll();
    const count = Cart.count();

    badgeEls.forEach((b) => {
      b.textContent = count;
      b.style.display = count === 0 ? "none" : "flex";
    });

    if (!list) return;

    if (items.length === 0) {
      list.innerHTML = `
        <div class="cart-empty">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <p>Your cart is empty</p>
          <span>Add some premium rides to your collection</span>
        </div>`;
    } else {
      list.innerHTML = items
        .map((item) => {
          const p = PRODUCTS.find((p) => p.id === item.productId);
          if (!p) return "";
          const colorName = p.colorNames[item.color] || p.colorNames[0];
          const colorHex = p.colors[item.color] || p.colors[0];
          return `
          <div class="cart-item" data-id="${p.id}" data-color="${item.color}">
            <div class="cart-item-img">
              <img src="${p.images[0]}" alt="${p.name}" loading="lazy"/>
            </div>
            <div class="cart-item-info">
              <div class="cart-item-name">${p.name}</div>
              <div class="cart-item-color">
                <span class="color-dot" style="background:${colorHex}"></span>${colorName}
              </div>
              <div class="cart-item-price">$${(p.price * item.qty).toLocaleString()}</div>
            </div>
            <div class="cart-item-controls">
              <button class="qty-btn" onclick="Cart.updateQty(${p.id},${item.color},${item.qty - 1});CartUI.refresh()">−</button>
              <span class="qty-val">${item.qty}</span>
              <button class="qty-btn" onclick="Cart.updateQty(${p.id},${item.color},${item.qty + 1});CartUI.refresh()">+</button>
              <button class="remove-btn" onclick="Cart.remove(${p.id},${item.color})">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                  <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
                </svg>
              </button>
            </div>
          </div>`;
        })
        .join("");
    }

    if (totalEl)
      totalEl.textContent = `$${Cart.total().toLocaleString()}`;
  }

  return { open, close, refresh, animateBadge };
})();

// ─── SCROLL REVEAL ───────────────────────────────────────────
function initScrollReveal() {
  const els = document.querySelectorAll("[data-reveal]");
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("revealed");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
  );

  els.forEach((el, i) => {
    el.style.transitionDelay = el.dataset.delay || `${i * 60}ms`;
    observer.observe(el);
  });
}

// ─── TOAST ───────────────────────────────────────────────────
function showToast(msg) {
  let t = document.getElementById("cx-toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "cx-toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timeout);
  t._timeout = setTimeout(() => t.classList.remove("show"), 2800);
}

// ─── INIT CART DRAWER ────────────────────────────────────────
function initCartDrawer() {
  CartUI.refresh();

  const cartBtns = document.querySelectorAll(".open-cart");
  cartBtns.forEach((b) => b.addEventListener("click", CartUI.open));

  const closeBtn = document.getElementById("cart-close");
  if (closeBtn) closeBtn.addEventListener("click", CartUI.close);

  const overlay = document.getElementById("cart-overlay");
  if (overlay) overlay.addEventListener("click", CartUI.close);
}

// ─── HEADER SCROLL ───────────────────────────────────────────
function initHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  });
}

// ─── MOBILE NAV ──────────────────────────────────────────────
function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav-links");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    toggle.classList.toggle("active");
  });
}

// ─── RUN ON EVERY PAGE ───────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initMobileNav();
  initCartDrawer();
  initScrollReveal();

  // Page-specific logic
  if (document.getElementById("products-grid")) initHomepage();
  if (document.getElementById("product-detail")) initProductPage();
});

// ============================================================
// HOMEPAGE
// ============================================================
function initHomepage() {
  const grid = document.getElementById("products-grid");
  const searchInput = document.getElementById("search-input");
  const sortSelect = document.getElementById("sort-select");
  const filterBtns = document.querySelectorAll(".filter-btn");

  let activeCategory = "all";
  let searchQuery = "";
  let sortOrder = "default";

  function renderProducts() {
    let list = [...PRODUCTS];

    if (activeCategory !== "all")
      list = list.filter((p) => p.category === activeCategory);

    if (searchQuery)
      list = list.filter((p) =>
        (p.name + p.categoryLabel).toLowerCase().includes(searchQuery)
      );

    if (sortOrder === "asc") list.sort((a, b) => a.price - b.price);
    else if (sortOrder === "desc") list.sort((a, b) => b.price - a.price);

    if (list.length === 0) {
      grid.innerHTML = `<div class="no-results" style="grid-column:1/-1;text-align:center;padding:80px 0;color:var(--muted)">
        <p style="font-size:1.5rem;margin-bottom:.5rem">No results found</p>
        <span>Try a different filter or search term</span>
      </div>`;
      return;
    }

    grid.innerHTML = list
      .map(
        (p) => `
      <article class="product-card" data-reveal onclick="window.location='product.html?id=${p.id}'">
        ${p.badge ? `<div class="card-badge">${p.badge}</div>` : ""}
        <div class="card-img-wrap">
          <img src="${p.images[0]}" alt="${p.name}" loading="lazy"/>
          <div class="card-overlay">
            <button class="btn-add-cart" onclick="event.stopPropagation();Cart.add(${p.id},1,0);showToast('${p.name} added to cart')">
              Add to Cart
            </button>
          </div>
        </div>
        <div class="card-body">
          <span class="card-cat">${p.categoryLabel}</span>
          <h3 class="card-name">${p.name}</h3>
          <div class="card-footer">
            <span class="card-price">$${p.price.toLocaleString()}</span>
            <div class="card-stars" aria-label="${p.rating} stars">
              ${renderStars(p.rating)}
            </div>
          </div>
        </div>
      </article>`
      )
      .join("");

    initScrollReveal();
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.dataset.cat;
      renderProducts();
    });
  });

  searchInput?.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    renderProducts();
  });

  sortSelect?.addEventListener("change", (e) => {
    sortOrder = e.target.value;
    renderProducts();
  });

  renderProducts();

  // Hero CTA
  const heroCta = document.getElementById("hero-shop-btn");
  if (heroCta) {
    heroCta.addEventListener("click", () => {
      document
        .getElementById("shop-section")
        ?.scrollIntoView({ behavior: "smooth" });
    });
  }
}

function renderStars(rating) {
  return Array.from({ length: 5 })
    .map((_, i) => {
      const full = i < Math.floor(rating);
      const half = !full && i < rating;
      return `<svg width="12" height="12" viewBox="0 0 24 24" fill="${
        full ? "var(--accent)" : half ? "url(#half)" : "none"
      }" stroke="var(--accent)" stroke-width="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>`;
    })
    .join("");
}

// ============================================================
// PRODUCT PAGE
// ============================================================
function initProductPage() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    document.getElementById("product-detail").innerHTML = `
      <div style="text-align:center;padding:120px 20px;color:var(--muted)">
        <h2>Product Not Found</h2>
        <a href="index.html" style="color:var(--accent)">← Back to Shop</a>
      </div>`;
    return;
  }

  document.title = `${product.name} — CYCLE X`;

  let selectedColor = 0;
  let selectedQty = 1;
  let activeImg = 0;

  const detail = document.getElementById("product-detail");

  detail.innerHTML = `
    <div class="pd-layout" data-reveal>
      <div class="pd-gallery">
        <div class="pd-thumbs">
          ${product.images
            .map(
              (img, i) => `
            <button class="pd-thumb ${
              i === 0 ? "active" : ""
            }" data-idx="${i}" onclick="switchImg(${i})">
              <img src="${img}" alt="${product.name} view ${i + 1}" loading="lazy"/>
            </button>`
            )
            .join("")}
        </div>
        <div class="pd-main-img">
          <div class="pd-main-glow"></div>
          <img id="main-product-img" src="${product.images[0]}" alt="${
    product.name
  }"/>
        </div>
      </div>
      <div class="pd-info">
        <div class="pd-breadcrumb">
          <a href="index.html">Home</a> / <a href="index.html">${
            product.categoryLabel
          }</a> / <span>${product.name}</span>
        </div>
        <div class="pd-badge-row">
          ${
            product.badge
              ? `<span class="pd-badge">${product.badge}</span>`
              : ""
          }
          <div class="pd-rating">
            ${renderStars(product.rating)}
            <span>(${product.reviews} reviews)</span>
          </div>
        </div>
        <h1 class="pd-title">${product.name}</h1>
        <div class="pd-price">$${product.price.toLocaleString()}</div>
        <p class="pd-desc">${product.description}</p>

        <div class="pd-option">
          <label>Color — <span id="color-label">${
            product.colorNames[0]
          }</span></label>
          <div class="color-swatches">
            ${product.colors
              .map(
                (c, i) => `
              <button class="swatch ${
                i === 0 ? "active" : ""
              }" style="--swatch:${c}" data-idx="${i}"
                onclick="selectColor(${i})" title="${product.colorNames[i]}">
                <span style="background:${c}"></span>
              </button>`
              )
              .join("")}
          </div>
        </div>

        <div class="pd-option">
          <label>Quantity</label>
          <div class="qty-control">
            <button onclick="changeQty(-1)">−</button>
            <span id="qty-display">1</span>
            <button onclick="changeQty(1)">+</button>
          </div>
        </div>

        <div class="pd-actions">
          <button class="btn-primary btn-glow" onclick="addToCartFromPage()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            Add to Cart
          </button>
          <button class="btn-wishlist" id="wishlist-btn" onclick="toggleWishlist(this)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>

        <div class="pd-specs">
          <div class="spec-card">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span class="spec-label">Weight</span>
            <span class="spec-val">${product.specs.weight}</span>
          </div>
          <div class="spec-card">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            <span class="spec-label">Top Speed</span>
            <span class="spec-val">${product.specs.speed}</span>
          </div>
          <div class="spec-card">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
            </svg>
            <span class="spec-label">Range</span>
            <span class="spec-val">${product.specs.range}</span>
          </div>
        </div>

        <div class="pd-trust">
          <span>🚚 Free worldwide shipping</span>
          <span>🔄 30-day returns</span>
          <span>🛡️ 3-year warranty</span>
        </div>
      </div>
    </div>

    <section class="related-section" data-reveal>
      <h2 class="section-title">You May Also Like</h2>
      <div class="related-grid">
        ${PRODUCTS.filter((p) => p.id !== id)
          .slice(0, 3)
          .map(
            (p) => `
          <article class="product-card" onclick="window.location='product.html?id=${p.id}'">
            ${p.badge ? `<div class="card-badge">${p.badge}</div>` : ""}
            <div class="card-img-wrap">
              <img src="${p.images[0]}" alt="${p.name}" loading="lazy"/>
              <div class="card-overlay">
                <button class="btn-add-cart" onclick="event.stopPropagation();Cart.add(${
                  p.id
                },1,0);showToast('${p.name} added to cart')">Add to Cart</button>
              </div>
            </div>
            <div class="card-body">
              <span class="card-cat">${p.categoryLabel}</span>
              <h3 class="card-name">${p.name}</h3>
              <div class="card-footer">
                <span class="card-price">$${p.price.toLocaleString()}</span>
                <div class="card-stars">${renderStars(p.rating)}</div>
              </div>
            </div>
          </article>`
          )
          .join("")}
      </div>
    </section>
  `;

  // expose helpers to global scope for inline handlers
  window.switchImg = (idx) => {
    activeImg = idx;
    const mainImg = document.getElementById("main-product-img");
    if (mainImg) {
      mainImg.style.opacity = "0";
      mainImg.style.transform = "scale(0.97)";
      setTimeout(() => {
        mainImg.src = product.images[idx];
        mainImg.style.opacity = "1";
        mainImg.style.transform = "scale(1)";
      }, 200);
    }
    document
      .querySelectorAll(".pd-thumb")
      .forEach((t) => t.classList.remove("active"));
    document
      .querySelector(`.pd-thumb[data-idx="${idx}"]`)
      ?.classList.add("active");
  };

  window.selectColor = (idx) => {
    selectedColor = idx;
    document
      .querySelectorAll(".swatch")
      .forEach((s) => s.classList.remove("active"));
    document
      .querySelector(`.swatch[data-idx="${idx}"]`)
      ?.classList.add("active");
    document.getElementById("color-label").textContent =
      product.colorNames[idx];
  };

  window.changeQty = (delta) => {
    selectedQty = Math.max(1, selectedQty + delta);
    document.getElementById("qty-display").textContent = selectedQty;
  };

  window.addToCartFromPage = () => {
    Cart.add(product.id, selectedQty, selectedColor);
    showToast(`${product.name} (×${selectedQty}) added to cart`);
  };

  window.toggleWishlist = (btn) => {
    btn.classList.toggle("wishlisted");
    showToast(
      btn.classList.contains("wishlisted")
        ? "Added to wishlist ♥"
        : "Removed from wishlist"
    );
  };

  initScrollReveal();
}
