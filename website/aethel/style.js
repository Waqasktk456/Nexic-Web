const app = {
    products: [
        { id: 'p1', title: 'Monstera Albo', price: '$1,200', image: 'plant2.png', desc: 'The holy grail of variegated plants. Large fenestrations with stark white sectors.' },
        { id: 'p2', title: 'Anthurium Waroc', price: '$950', image: 'plant3.png', desc: 'The Queen Anthurium features long, velvety, dark emerald leaves.' },
        { id: 'p3', title: 'Philodendron Melano', price: '$450', image: 'plant5.png', desc: 'Gold-crystalline velvet leaves that darken as they mature.' },
        { id: 'p4', title: 'Ficus Audrey', price: '$320', image: 'plant5.png', desc: 'Architectural branching with matte green leaves and white bark.' },
        { id: 'p5', title: 'Rhaphidophora', price: '$280', image: 'plant3.png', desc: 'Fast-climbing jungle species with split-leaf aesthetics.' },
        { id: 'p6', title: 'Aglaonema Silver', price: '$190', image: 'plant5.png', desc: 'Symmetrical silver foliage, perfect for low-light environments.' }
    ],

    init() {
        this.renderGrid();
        this.navScroll();
    },

    renderGrid() {
        const grid = document.getElementById('product-grid');
        grid.innerHTML = this.products.map(p => `
            <div class="product-card" onclick="app.openProduct('${p.id}')">
                <div class="card-dome glass-dome">
                    <img src="${p.image}" alt="${p.title}">
                </div>
                <div class="card-info">
                    <h3 class="card-title">${p.title}</h3>
                    <div class="card-price">${p.price}</div>
                </div>
            </div>
        `).join('');
    },

    navigate(view) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.querySelectorAll('.view-section').forEach(v => v.classList.remove('is-active'));
        document.getElementById(`view-${view}`).classList.add('is-active');
    },

    openProduct(id) {
        const p = this.products.find(item => item.id === id);
        document.getElementById('pd-image').src = p.image;
        document.getElementById('pd-title').innerText = p.title;
        document.getElementById('pd-price').innerText = p.price;
        document.getElementById('pd-desc').innerText = p.desc;
        this.navigate('product');
    },

    navScroll() {
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('navbar');
            nav.classList.toggle('scrolled', window.scrollY > 50);
        });
    },

    scrollTo(id) {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());