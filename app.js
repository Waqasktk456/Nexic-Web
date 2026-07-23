/* =============================================
   WebVault — Premium Website Marketplace
   app.js — Frontend Logic
   ============================================= */

'use strict';

// ============================================================
// 👉 WEBSITES LOADED FROM DATABASE
// Each card is AUTO GENERATED from this data — no HTML needed
// ============================================================
let WEBSITES = []; // Will be populated from database

// ============================================================
// LOAD WEBSITES FROM DATABASE
// ============================================================
async function loadWebsites() {
  try {
    const response = await fetch(`${API.BASE_URL}/api/websites`);
    const data = await response.json();
    
    if (data.success && data.data) {
      console.log('Loaded websites:', data.data); // Debug: see what we got from database
      
      // Transform database format to match existing frontend format
      WEBSITES = data.data.map(w => {
        console.log('Website image URL:', w.thumbnail_url); // Debug: see each image URL
        return {
          id: w.id,
          title: w.title,
          image: w.thumbnail_url,
          description: w.description,
          link: w.demo_url,
          category: w.category.toLowerCase(), // Normalize category
          detailsPage: w.details_page || '#',
          featured: w.featured
        };
      });
      
      console.log('Transformed WEBSITES:', WEBSITES); // Debug: see final array
      renderWebsites();
    } else {
      showWebsiteError('No websites available');
    }
  } catch (error) {
    console.error('Load websites error:', error);
    showWebsiteError('Unable to load websites');
  }
}

function showWebsiteError(message) {
  const grid = document.getElementById("websites-grid");
  if (grid) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text3);">
        ${message}
      </div>
    `;
  }
}

// ============================================================
// HARDCODED WEBSITES (BACKUP - Remove after database is populated)
// ============================================================
const WEBSITES_BACKUP = [
  {
    id: "w18",
    title: "AETHER. ",
    image: "image/land4.png",
    description: "Modern banking & wealth management template built for fintech brands, advisors, and investment firms. Clean, trusted, and conversion-focused.",
    link: "https://bank-wealth.netlify.app/",
    category: "agency",
     detailsPage: "w18detail.html"



  },
{
    id: "w28",
    title: "ADVANCE VERSION NEXIC. ",
    image: "image/LAND.png",
    description: "Empowering brands with modern strategies, creative design, and measurable digital success.",
    link: "https://like-nexic.netlify.app/",
    category: "agency",
    detailsPage: "w28detail.html"



  },
 
{
    id: "w30",
    title: "TITTAN-X. ",
    image: "image/new/TITAN.png",
    description: "Transform operations with next-generation AI, intelligent workflows, and scalable autonomous technologies built for the digital era.",
    link: "https://autonomous-nexic.netlify.app/",
    category: "agency",
    detailsPage: "w30detail.html"



  },

{
    id: "w31",
    title: "nexos.",
    image: "image/new/nexos-enterprise.png",
    description: "Empower your organization with enterprise-grade software, intelligent automation, cloud technologies, and secure digital solutions. Our mission is to help businesses innovate faster, streamline operations, improve productivity, and achieve sustainable growth with future-ready technology tailored for modern enterprises.",
    link: "https://nexos-enterprise.netlify.app/",
    category: "agency",
    detailsPage: "w31detail.html"



  },


{
    id: "w32",
    title: "RAVEN",
    image: "image/new/creative-raven..png",
    description: "We transform ambitious ideas into impactful digital experiences through exceptional design, powerful branding, and modern technology—helping businesses stand out, connect, and grow with confidence.",
    link: "https://creative-raven.netlify.app/",
    category: "agency",
    detailsPage: "w32detail.html"



  },




 {
    id: "w12",
    title: "GRAPHIC DESIGNER",
    image: "image/gra[hic.png",
    description: "Modern designer portfolio with a bold visual style, smooth experience, and client-focused presentation.",
    link: "https://benjam-photo.netlify.app/",
    category: "portfolio",
    detailsPage: "w12detail.html"
  
  },

   

  {
    id: "w34",
    title: " VECTRAL",
    image: "image/new/vectral.png",
    description: "Helping businesses embrace digital transformation through cutting-edge software, cloud infrastructure, and intelligent automation designed for long-term success.",
    link: "https://vectral-nexic.netlify.app/",
    category: "agency",
    detailsPage: "w34detail.html"


  },




  {
    id: "w3",
    title: "CELLO",
    image: "cello.png",
    description: "Modern online store template with a sleek design, seamless shopping experience, and conversion-focused layout..",
    link: "https://admirable-nexic.netlify.app/",
    category: "free",

  detailsPage: "w3detail.html"

    



  },









  {
    id: "w4",
    title: "Architectural Nature",
    image: "image/aethel.png",
    description: "Modern botanical eCommerce template with a fresh aesthetic and conversion-focused design. 🌿.",
    link: "https://aethel-plant.netlify.app/",
    category: "free",
    detailsPage: "w4detail.html"
  },






  {
    id: "w5",
    title: "SKYFORGE",
    image: "image/land1.png",
    description: "Premium drone website template with a futuristic design and immersive product presentation. 🚁",
    link: "https://drone-nexic.netlify.app/",
    category: "landing",

    detailsPage: "w5detail.html"
  },

{                                             
    id: "w6",
    title: "CYBERELITE",
    image: "image/land2.png",
    description: "Modern cyber tech template with a futuristic design, bold visuals, and conversion-focused layout. 🔐",
    link: "https://cyber-nexic.netlify.app/",
    category: "landing",
    detailsPage: "w6detail.html"
      
    
  },


{
    id: "w7",
    title: "MAX CAR",
    image: "image/land3.png",
    description: "A sleek automotive landing page template with a bold design, immersive visuals, and conversion-focused layout. 🚗",
    link: " https://car-store-nexic.netlify.app/",
    category: "landing",
   detailsPage: "w7detail.html"
  },




  {
    id: "w35",
    title: " MONOLITH",
    image: "image/new/monolith.png",
    description: "  We partner with ambitious organizations to create enterprise-grade digital experiences that simplify complexity, improve operational efficiency, and unlock new opportunities through modern technology and strategic innovation.",
    link: "https://monolith-nexic.netlify.app/",
    category: "Free",
    detailsPage: "w35detail.html"



  },






  {
    id: "w8",
    title: "Lumière",
    image: "image/lumiere.png",
    description: "A modern fashion eCommerce template with a sleek design, seamless shopping experience, and conversion-focused layout. 👗",
    link: "https://lumiere-fashion.netlify.app/",
    category: "free",
    detailsPage: "w8detail.html"


  },
  
 {
    id: "w9",
    title: "Visual Architecture",
    image: "image/saas1.png",
    description: "A modern SaaS template with a sleek design, seamless user experience, and conversion-focused layout. Perfect for tech startups and software companies. 💻",
    link: "https://art-demo-saas.netlify.app/",
    category: "free",

 detailsPage: "w9detail.html"







  },
{
    id: "w10",
    title: "Educational site",
    image: "image/rajsahischool.png",
    description: "Rajshahi Model Academy | Excellence in Education",
    link: "https://rajsahi-model.netlify.app/ ",
    category: "agency",
    detailsPage: "w10detail.html"
  },  
{
    id: "w11",
    title: "NEX US SAAS",
    image: "image/saas2.png",
    description: "Modern corporate template with a professional design and conversion-focused user experience.",
    link: "https://reliable-nexic.netlify.app/ ",
    category: "free",
     detailsPage: "w11detail.html"
  },





{
    id: "w27",
    title: "ASTRA. ",
    image: "image/wpdemo.png",
    description: "DEMO UNIT. wordpress sites ar soon in nexic.",
    link: "https://nexicweb.site.je/nexic/",
    category: "WORDPRESS",
     detailsPage: "w27detail.html"



  },


{
    id: "w38",
    title: "Aurix OS",
    image: "image/new/AurixOS.png",
    description: "Lucent Aurix OS combines enterprise-grade performance, AI-driven intelligence, cloud-native infrastructure, and advanced cybersecurity into one unified platform. Designed for organizations that demand reliability, flexibility, and innovation, it empowers businesses to transform operations, accelerate growth, and stay ahead in a rapidly evolving digital world.  ",
    link: " https://lucent-aurix-os.netlify.app/ ",
    category: "agency",
    detailsPage: "w38detail.html"



  },



  
  {
    id: "w2",
    title: "Ride Light",
    image: "image/cyclex.png",
    description: "A modern eCommerce template for cycling brands, with a sleek design, seamless shopping experience, and conversion-focused layout. 🚴‍♂️",
    link: "https://cycle-x-xcycle.netlify.app/",
    category: "ecommerce",
    detailsPage: "w2detail.html"
   



  },
  



  {
    id: "w13",
    title: "DESIGNER ",
    image: "image/designer.png",
    description: "A modern designer portfolio template with a bold visual style, smooth experience, and client-focused presentation.",
    link: "https://designer-nexic.netlify.app/",
    category: "portfolio",
 detailsPage: "w13detail.html"
      
  
  },


{
    id: "w36",
    title: " meridian",
    image: "image/new/meridian.png",
    description: " Meridian Nexic empowers organizations with enterprise-grade software, AI-driven automation, cloud technologies, and intelligent digital solutions that simplify operations and unlock new opportunities for growth. Built for modern businesses, our platform combines innovation, reliability, and scalability to help teams achieve long-term success with confidence. ",
    link: "https://meridian-nexic.netlify.app/",
    category: "agency",
    detailsPage: "w36detail.html"



  },




  
   {
    id: "w14",
    title: "FASHION DESIGNER",
    image: "image/fashiondesigner.png",
    description: "A modern fashion designer portfolio template with a sleek design, seamless user experience, and conversion-focused layout. 👗",
    link: " https://cyber-nexic.netlify.app/",
    category: "portfolio",
 detailsPage: "w14detail.html"
      
  
  },


 {
    id: "w15",
    title: "PORTFOLIO ",
    image: "image/portfolio.png",
    description: "A sleek portfolio template built to impress clients and highlight your best work. ✨💼",
    link: "  https://portdolio-nexic.netlify.app  ",
    category: "portfolio",
    detailsPage: "w15detail.html"
  },


 {
    id: "w16",
    title: "K. VANCE.",
    image: "image/editor.png",
    description: "Modern creative portfolio with a bold, professional design built to leave a strong first impression. 🚀 ",
    link: "https://kalen-vance-nexic.netlify.app/",
    category: "portfolio",
 detailsPage: "w16detail.html"
  },

  {
    id: "w17",
    title: "Agency",
    image: "image/indonisia.png",
    description: "A modern agency template with a sleek design, seamless user experience, and conversion-focused layout. Perfect for creative agencies and digital studios. 🎨",
    link: "https://indonisiya-travel.netlify.app/",
    category: "agency",
  detailsPage: "w17detail.html"
  

  },
 
  
  // {
  //   id: "w39",
  //   title: "Atelier Voss",
  //   image: "image/indonisia.png",
  //   description: "We operate at the intersection of technology, culture, and business transformation. For organizations that refuse to be ordinary.🎨",
  //   link: "https://indonisiya-travel.netlify.app/",
  //   category: "agency",
  // detailsPage: "w39detail.html"
  

  // },
 



  {
    id: "w22",
    title: "  NIKE STORE",
    image: "image/aura.png",
    description: "A modern eCommerce template for fashion brands, with a sleek design, seamless shopping experience, and conversion-focused layout.👟",
    link: "https://developertahmid.github.io/website2/",
    category: "Free",
    detailsPage: "w22detail.html" 

  },

  {
    id: "w19",
    title: "farera.",
    image: "image/blog.png",
    description: "Premium eCommerce template designed to boost sales with a clean, modern, and conversion-focused design. 🛒🔥",
    link: "https://farera-nexic.netlify.app/",
    category: "Free",
    detailsPage: "w19detail.html"
  },
  
 {
    id: "w20",
    title: "Aura SAAS",
    image: "image/blog2.png",
    description: "A modern SaaS template with a sleek design, seamless user experience, and conversion-focused layout. Perfect for tech startups and software companies. 💻",
    link: "https://deluxe-nexic.netlify.app/",
    category: "Free",
    detailsPage: "w20detail.html"
  },

{
    id: "w21",
    title: "cyberneti. SAAS",
    image: "image/saas4.png",
    description: "A wellness editorial blog with beautiful typography, dark mode, and newsletter subscription.",
    link: "https://cyberneti-nexic.netlify.app/",
    category: "Free",
    detailsPage: "w21detail.html"
  },



  
{
    id: "w23",
    title: "sass",
    image: "image/blog5.png",
    description: "A wellness editorial blog with beautiful typography, dark mode, and newsletter subscription.",
    link: "https://dulcet-nexic.netlify.app/",
    category: "free",
   detailsPage: "w23detail.html"
  },

  {
    id: "w24",
    title: "NEXIC.SAAS",
    image: "image/service.png",
    description: "Premium service SaaS landing page template designed to showcase solutions and convert visitors into clients. 🚀",
    link: "https://service-slass.netlify.app/",
    category: "Free",
    detailsPage: "w24detail.html"
  },

  {
    id: "w25",
    title: "NEXUS 2.0",
    image: "image/saas3.png",
    description: "Premium multi-purpose website template designed for startups, SaaS, and modern digital agencies. ",
    link: "  https://nexus-2-nexic.netlify.app/  ",
    category: "Free",
    detailsPage: "w25detail.html"
  },

{
    id: "w37",
    title: "  DANCING NEXORA",
    image: "image/new/DANCING-NEXORA.png",
    description: "Dancing Nexora empowers businesses with premium branding, modern web experiences, creative strategy, and innovative digital solutions that elevate brand identity and accelerate growth. By combining bold creativity with cutting-edge technology, we help organizations create memorable experiences, strengthen customer connections, and achieve sustainable success in today's competitive digital landscape. ",
    link: "https://dancing-nexora.netlify.app/",
    category: "agency",
    detailsPage: "w37detail.html"



  },







  {
    id: "w26",
    title: "DIGITAL SAAS",
    image: "image/blog4.png",
    description: "A modern SaaS template with a sleek design, seamless user experience, and conversion-focused layout. Perfect for tech startups and software companies. 💻",
    link: "          https://stalwart-nexic.netlify.app/         ",
    category: "Free",
    detailsPage: "w26detail.html"
  },
  

  {
    id: "w33",
    title: "Kael Ashford",
    image: "image/new/lustrous-asford.png",
    description: "  Lustrous Asford empowers forward-thinking organizations with premium digital solutions that combine elegant design, intelligent technology, and scalable innovation. From enterprise platforms and brand experiences to strategic digital transformation, we help businesses create lasting value, strengthen customer trust, and achieve sustainable growth in a competitive global marketplace.",
    link: "https://lustrous-asford.netlify.app/",
    category: "agency",
    detailsPage: "w33detail.html"



  },



  // 👉 ADD NEW WEBSITE HERE — Copy this object and fill in the details:
  // {
  //   id: "w16",
  //   title: "Your Website Name",
  //   image: "path/to/your/image.jpg",  // 👉 CHANGE IMAGE HERE
  //   description: "Short description of the website.",
  //   link: "https://yourwebsite.com",  // 👉 ADD WEBSITE LINK HERE
  //   category: "ecommerce", // options: ecommerce, saas, portfolio, blog, landing, agency
  //   price: "৳X,XXX"
  // },
];

// ============================================================
// CONFIG
// ============================================================
const PER_PAGE = 9; // 👉 CHANGE cards per page here
const WHATSAPP_NUMBER = "01334212149"; // 👉 CHANGE WhatsApp number here

// ============================================================
// STATE
// ============================================================
let currentPage = 1;
let activeFilter = "all";
let searchQuery = "";
let cart = JSON.parse(localStorage.getItem("webvault_cart") || "[]");

// ============================================================
// UTILITY FUNCTIONS
// ============================================================
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  setTimeout(() => { toast.className = "toast"; }, 3000);
}

function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (badge) badge.textContent = cart.length;
}

function saveCart() {
  localStorage.setItem("webvault_cart", JSON.stringify(cart));
  updateCartBadge();
}

// ============================================================
// FILTER LOGIC
// ============================================================
function getFilteredWebsites() {
  return WEBSITES.filter(w => {
    const matchesFilter = activeFilter === "all" || w.category === activeFilter;
    const matchesSearch = w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          w.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });
}

// ============================================================
// CARD RENDERER — Auto generates cards from WEBSITES array
// ============================================================
function createCard(website, index) {
  const isInCart = cart.some(c => c.id === website.id);
  const card = document.createElement("div");
  card.className = "website-card";
  card.style.animationDelay = `${index * 0.06}s`;

  // Determine if this card is on the first page (priority loading)
  const isFirstPage = index < PER_PAGE;
  const loadingStrategy = isFirstPage ? 'eager' : 'lazy';

  card.innerHTML = `
    <div class="card-img-wrapper">
      ${website.image && website.image !== 'https://via.placeholder.com/400x300'
        ? `<img class="card-img" src="${website.image}" alt="${website.title}" loading="${loadingStrategy}" 
               onerror="console.error('Failed to load:', this.src); this.style.display='none';this.nextElementSibling.style.display='flex'">`
        : ''}
      <div class="card-img-placeholder" style="${website.image && website.image !== 'https://via.placeholder.com/400x300' ? 'display:none' : ''}">🌐</div>
      <span class="card-category">${website.category}</span>
      <div class="card-overlay">
        <!-- 👉 ADD WEBSITE LINK HERE — controlled by website.link in the data array above -->
        <a href="${website.link}" target="_blank" rel="noopener noreferrer" class="overlay-preview-btn">
          <i class="fas fa-eye"></i> Preview
        </a>
      </div>
    </div>
    <div class="card-body">
      <h3 class="card-title">${website.title}</h3>
      <p class="card-desc">${website.description}</p>
      <div class="card-actions">


<div class="price-slider">

  ${website.prices?.map(price => `
  
    <div class="price-item">
      ${price}
    </div>

  `).join("") || ""}

</div>


     <div class="card-actions">

  <a href="${website.link}"
     target="_blank"
     rel="noopener noreferrer"
     class="card-overview-btn">
     Live Preview
     <i class="fas fa-arrow-up-right-from-square"></i>
  </a>

  <a href="${website.detailsPage || '#'}"
     class="card-details-btn">
     See Details
  </a>

  <button class="card-cart-btn ${isInCart ? 'added' : ''}"
          data-id="${website.id}">
      <i class="fas ${isInCart ? 'fa-check' : 'fa-bag-shopping'}"></i>
  </button>

</div>
      </div>
    </div>
  `;

  // Cart button event
  card.querySelector(".card-cart-btn").addEventListener("click", () => addToCart(website.id));
  return card;
}

// ============================================================
// RENDER WEBSITES + PAGINATION
// ============================================================
function renderWebsites() {
  const grid = document.getElementById("websites-grid");
  const filtered = getFilteredWebsites();
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  // Clamp page
  if (currentPage > totalPages) currentPage = Math.max(1, totalPages);

  const start = (currentPage - 1) * PER_PAGE;
  const pageItems = filtered.slice(start, start + PER_PAGE);

  grid.innerHTML = "";

  if (pageItems.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <h3>No websites found</h3>
        <p>Try a different search term or category filter.</p>
      </div>`;
  } else {
    pageItems.forEach((w, i) => grid.appendChild(createCard(w, i)));
    
    // Preload images for next pages in background (after current page loads)
    if (currentPage === 1) {
      preloadNextPageImages(filtered);
    }
  }

  renderPagination(totalPages);
}

// Preload images for other pages in the background
function preloadNextPageImages(allWebsites) {
  // Wait a bit to let first page images load first
  setTimeout(() => {
    const remainingWebsites = allWebsites.slice(PER_PAGE);
    remainingWebsites.forEach(website => {
      if (website.image && website.image !== 'https://via.placeholder.com/400x300') {
        const img = new Image();
        img.src = website.image; // Preload in background
      }
    });
  }, 1000); // Start preloading after 1 second
}

function renderPagination(totalPages) {
  const pag = document.getElementById("pagination");
  pag.innerHTML = "";
  if (totalPages <= 1) return;

  const createBtn = (label, page, disabled = false, active = false) => {
    const btn = document.createElement("button");
    btn.className = `page-btn${active ? " active" : ""}`;
    btn.innerHTML = label;
    btn.disabled = disabled;
    if (!disabled && !active) btn.addEventListener("click", () => {
      currentPage = page;
      renderWebsites();
      document.getElementById("websites").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return btn;
  };

  pag.appendChild(createBtn('<i class="fas fa-chevron-left"></i>', currentPage - 1, currentPage === 1));

  for (let i = 1; i <= totalPages; i++) {
    if (totalPages > 7 && (i > 2 && i < totalPages - 1 && Math.abs(i - currentPage) > 1)) {
      if (i === 3 || i === totalPages - 2) {
        const dots = document.createElement("span");
        dots.textContent = "…";
        dots.style.cssText = "color:var(--text3);padding:0 0.3rem;align-self:center;";
        pag.appendChild(dots);
      }
      continue;
    }
    pag.appendChild(createBtn(i, i, false, i === currentPage));
  }

  pag.appendChild(createBtn('<i class="fas fa-chevron-right"></i>', currentPage + 1, currentPage === totalPages));
}

// ============================================================
// CART SYSTEM
// ============================================================
function addToCart(id) {
  const website = WEBSITES.find(w => w.id === id);
  if (!website) return;

  if (cart.some(c => c.id === id)) {
    showToast(`"${website.title}" is already in your cart`, "error");
    return;
  }

  cart.push({ id: website.id, title: website.title, image: website.image, link: website.link, category: website.category });
  saveCart();
  renderWebsites(); // refresh cards to show added state
  renderCartItems();
  showToast(`✓ "${website.title}" added to cart`);
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  renderCartItems();
  renderWebsites();
  showToast("Item removed from cart");
}

function renderCartItems() {
  const container = document.getElementById("cart-items");
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-bag-shopping"></i>
        <p>Your cart is empty.<br/>Add some websites to get started.</p>
      </div>`;
    return;
  }

  container.innerHTML = "";
  cart.forEach(item => {
    const el = document.createElement("div");
    el.className = "cart-item";
    el.innerHTML = `
      ${item.image
        ? `<img class="cart-item-img" src="${item.image}" alt="${item.title}" onerror="this.style.display='none'">`
        : `<div class="cart-item-img" style="display:flex;align-items:center;justify-content:center;font-size:1.4rem;">🌐</div>`}
      <div class="cart-item-info">
        <h4>${item.title}</h4>
        <span>${item.category}</span>
      </div>
      <button class="remove-item" data-id="${item.id}" title="Remove"><i class="fas fa-trash-can"></i></button>
    `;
    el.querySelector(".remove-item").addEventListener("click", () => removeFromCart(item.id));
    container.appendChild(el);
  });
}

function openCart() {
  renderCartItems();
  document.getElementById("cart-drawer").classList.add("open");
  document.getElementById("cart-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("cart-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

// WhatsApp checkout
function checkout() {
  if (cart.length === 0) { showToast("Your cart is empty!", "error"); return; }
  const itemList = cart.map(c => `• ${c.title} → ${c.link}`).join("%0A");
  const msg = `I want to buy:%0A%0A${itemList}%0A%0APlease assist me with the purchase.`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  window.open(url, "_blank");
}

// Membership buy
function buyMembership(plan) {
  const msg = `I want to subscribe to the WebVault ${plan}. Please provide payment details.`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}
window.buyMembership = buyMembership;

// ============================================================
// SEARCH
// ============================================================
function initSearch() {
  const input = document.getElementById("search-input");
  const clearBtn = document.getElementById("clear-search");

  input.addEventListener("input", () => {
    searchQuery = input.value.trim();
    clearBtn.classList.toggle("visible", searchQuery.length > 0);
    currentPage = 1;
    renderWebsites();
  });

  clearBtn.addEventListener("click", () => {
    input.value = "";
    searchQuery = "";
    clearBtn.classList.remove("visible");
    currentPage = 1;
    renderWebsites();
    input.focus();
  });
}

// ============================================================
// FILTER TABS
// ============================================================
function initFilters() {
  document.querySelectorAll(".filter-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      activeFilter = tab.dataset.filter;
      currentPage = 1;
      renderWebsites();
    });
  });
}

// ============================================================
// AUTH MODAL
// ============================================================
function initAuth() {
  const overlay = document.getElementById("auth-overlay");
  const openBtn = document.getElementById("open-auth");
  const closeBtn = document.getElementById("close-auth");
  const tabLogin = document.getElementById("tab-login");
  const tabSignup = document.getElementById("tab-signup");
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const goSignup = document.getElementById("go-signup");
  const goLogin = document.getElementById("go-login");

  const openModal = () => { 
    overlay.classList.add("open"); 
    document.body.style.overflow = "hidden"; 
    // Remove all active navbar links when modal opens
    document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
  };
  
  const closeModal = () => { 
    overlay.classList.remove("open"); 
    document.body.style.overflow = "";
    // Reset to login tab view
    document.querySelector(".auth-tabs").style.display = "flex";
    otpForm.classList.add("hidden");
    switchTab('login');
  };

  openBtn.addEventListener("click", (e) => { e.preventDefault(); openModal(); });
  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });

  function switchTab(tab) {
    tabLogin.classList.toggle("active", tab === "login");
    tabSignup.classList.toggle("active", tab === "signup");
    loginForm.classList.toggle("hidden", tab !== "login");
    signupForm.classList.toggle("hidden", tab !== "signup");
    otpForm.classList.add("hidden"); // Always hide OTP when switching tabs
  }

  tabLogin.addEventListener("click", () => switchTab("login"));
  tabSignup.addEventListener("click", () => switchTab("signup"));
  if (goSignup) goSignup.addEventListener("click", (e) => { e.preventDefault(); switchTab("signup"); });
  if (goLogin) goLogin.addEventListener("click", (e) => { e.preventDefault(); switchTab("login"); });

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = loginForm.querySelector('input[type="email"]').value.trim();
    const password = loginForm.querySelector('input[type="password"]').value;
    const btn = loginForm.querySelector(".auth-submit");
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Validation
    if (!email || !password) {
      showToast("Please fill in all fields", "error");
      return;
    }
    
    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }
    
    btn.textContent = "Logging in...";
    btn.disabled = true;
    
    try {
      const res = await fetch(API.AUTH.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem("nexicweb_user", JSON.stringify(data.user));
        
        // Check if user is admin and redirect to admin dashboard
        if (data.user.role === 'admin') {
          showToast("🎉 Welcome Admin! Redirecting to dashboard...");
          loginForm.reset();
          closeModal();
          setTimeout(() => {
            window.location.href = 'admin-dashboard.html';
          }, 1500);
        } else {
          showToast("✓ Logged in successfully!");
          loginForm.reset();
          closeModal();
          checkAuthStatus();
        }
      } else {
        showToast(data.message || "Login failed", "error");
      }
    } catch (error) {
      showToast("Network error. Please check your connection.", "error");
      console.error("Login error:", error);
    } finally {
      btn.textContent = "Login to WebVault";
      btn.disabled = false;
    }
  });

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    
    const name = signupForm.querySelector('input[type="text"]').value.trim();
    const email = signupForm.querySelector('input[type="email"]').value.trim();
    const password = signupForm.querySelector('input[type="password"]').value;
    const btn = signupForm.querySelector(".auth-submit");
    
    // Prevent double submission
    if (btn.disabled) {
      return;
    }
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Validation
    if (!name || !email || !password) {
      showToast("Please fill in all fields", "error");
      return;
    }
    
    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }
    
    if (password.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }
    
    btn.textContent = "Creating account...";
    btn.disabled = true;
    
    try {
      const res = await fetch(API.AUTH.SIGNUP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        showToast("✓ " + data.message, "success");
        // Hide tabs and show OTP form
        document.querySelector(".auth-tabs").style.display = "none";
        signupForm.classList.add("hidden");
        loginForm.classList.add("hidden");
        otpForm.classList.remove("hidden");
        document.getElementById("otp-email").value = data.email;
      } else {
        showToast(data.message || "Signup failed", "error");
        btn.disabled = false; // Re-enable on error
      }
    } catch (error) {
      showToast("Network error. Please check your connection.", "error");
      console.error("Signup error:", error);
      btn.disabled = false; // Re-enable on error
    } finally {
      if (!otpForm.classList.contains("hidden")) {
        // Only reset button if we didn't navigate to OTP form
        setTimeout(() => {
          btn.textContent = "Create Account";
        }, 1000);
      } else {
        btn.textContent = "Create Account";
      }
    }
  }, { once: false }); // Ensure listener added only once
}

// ============================================================
// NAVBAR — Scroll effect + hamburger
// ============================================================
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
  });

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.innerHTML = navLinks.classList.contains("open")
      ? '<i class="fas fa-xmark"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Close on link click
  document.querySelectorAll(".nav-link:not(.btn-login):not(.cart-btn)").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // Active link on scroll - using IntersectionObserver for accuracy
  const sections = document.querySelectorAll("section[id]");
  const navHeight = navbar.offsetHeight;
  
  const observerOptions = {
    root: null,
    rootMargin: `-${navHeight}px 0px -50% 0px`,
    threshold: 0
  };
  
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        document.querySelectorAll(".nav-link").forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };
  
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => observer.observe(section));

  // Detect footer/bottom of page for Support Center link
  window.addEventListener("scroll", () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const clientHeight = window.innerHeight;
    
    // If scrolled to bottom (within 100px threshold)
    if (scrollHeight - scrollTop - clientHeight < 100) {
      document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
        if (link.textContent.trim().includes("Support")) {
          link.classList.add("active");
        }
      });
    }
  }, { passive: true });
}

// ============================================================
// COUNTER ANIMATION (hero stats)
// ============================================================
function animateCounters() {
  const counters = document.querySelectorAll(".stat-num");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1500;
      const step = Math.ceil(target / (duration / 16));
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current.toLocaleString();
        if (current >= target) clearInterval(timer);
      }, 16);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

// ============================================================
// CART EVENTS
// ============================================================
function initCartEvents() {
  document.getElementById("nav-cart-btn").addEventListener("click", (e) => { e.preventDefault(); openCart(); });
  document.getElementById("close-cart").addEventListener("click", closeCart);
  document.getElementById("cart-overlay").addEventListener("click", closeCart);
  document.getElementById("checkout-btn").addEventListener("click", checkout);
  document.getElementById("clear-cart-btn").addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCartItems();
    renderWebsites();
    showToast("Cart cleared");
  });
}

// ============================================================
// AUTH STATUS CHECK
// ============================================================
function checkAuthStatus() {
  const user = JSON.parse(localStorage.getItem("nexicweb_user") || "null");
  const authBtn = document.getElementById("open-auth");
  const userDisplay = document.getElementById("user-display");
  const userName = document.getElementById("user-name");
  const logoutLink = document.getElementById("logout-link");
  
  if (user) {
    // User is logged in - show username and logout link, hide login button
    userName.textContent = `👤 ${user.name}`;
    userDisplay.style.display = "flex";
    authBtn.style.display = "none";
    
    logoutLink.onclick = (e) => {
      e.preventDefault();
      logout();
    };
  } else {
    // User is not logged in - hide username/logout, show login button
    userDisplay.style.display = "none";
    authBtn.style.display = "block";
    
    authBtn.textContent = "Login";
    authBtn.onclick = (e) => {
      e.preventDefault();
      initAuth();
      document.getElementById("auth-overlay").classList.add("open");
      document.body.style.overflow = "hidden";
      document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
    };
  }
}

function logout() {
  localStorage.removeItem("nexicweb_user");
  showToast("✓ Logged out successfully");
  checkAuthStatus();
}

// ============================================================
// TEAM MEMBERS - Load from Database
// ============================================================
async function loadTeamMembers() {
  try {
    const response = await fetch(`${API.BASE_URL}/api/team`);
    const data = await response.json();
    
    if (data.success && data.data.length > 0) {
      displayTeamMembers(data.data);
    } else {
      // Show fallback message if no team members
      document.getElementById('experts-grid').innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text3);">
          No team members available
        </div>
      `;
    }
  } catch (error) {
    console.error('Load team members error:', error);
    // Show fallback message on error
    document.getElementById('experts-grid').innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text3);">
        Unable to load team members
      </div>
    `;
  }
}

function displayTeamMembers(members) {
  const grid = document.getElementById('experts-grid');
  
  grid.innerHTML = members.map(member => `
    <div class="expert-card">
      <div class="expert-img">
        <img src="${member.image_url}" alt="${member.name}" 
             onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'">
      </div>
      <h3>${member.name}</h3>
      <p>${member.role}</p>
      ${member.portfolio_url ? `
        <a href="${member.portfolio_url}" target="_blank" class="expert-link">
          View Portfolio <i class="fas fa-arrow-up-right-from-square"></i>
        </a>
      ` : ''}
    </div>
  `).join('');
}

// ============================================================
// INIT
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  loadWebsites(); // Load websites from database then render
  initSearch();
  initFilters();
  checkAuthStatus();
  initAuth();
  initNavbar();
  initCartEvents();
  animateCounters();
  updateCartBadge();
  loadTeamMembers(); // Load team members from database
});






///


document.querySelectorAll(".price-item").forEach(item => {
  item.addEventListener("click", () => {

    item.parentElement
      .querySelectorAll(".price-item")
      .forEach(el => el.classList.remove("active"));

    item.classList.add("active");

  });
});


//// 

document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);

  if (params.get("openLogin") === "true") {

    const loginBtn = document.getElementById("open-auth");

    if (loginBtn) {
      setTimeout(() => {
        loginBtn.click();
      }, 500);
    }

  }

});


