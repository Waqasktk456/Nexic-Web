document.addEventListener('DOMContentLoaded', () => {

    // 1. Dynamic Year in Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // 2. Custom Cursor Glow Effect
    const cursor = document.getElementById('cursor-glow');
    let isMouseMoving = false;

    window.addEventListener('mousemove', (e) => {
        isMouseMoving = true;
        cursor.style.opacity = '1';
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    window.addEventListener('mouseout', () => {
        cursor.style.opacity = '0';
    });

    // 3. Sticky Navbar & Blur Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Dark/Light Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.hasAttribute('data-theme')) {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // 5. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 6. Simple Hero Auto-Slider Simulation
    const dots = document.querySelectorAll('.dot');
    const heroTitle = document.getElementById('hero-title');
    const heroImage = document.getElementById('hero-image');
    
    const sliderData = [
        {
            title: "The Art of Minimalist Living.",
            image: "https://images.unsplash.com/photo-1492446845049-9c50cc313f00?auto=format&fit=crop&q=80&w=1200"
        },
        {
            title: "Redefining Modern Luxury.",
            image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200"
        },
        {
            title: "Architectural Beauty Decoded.",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
        }
    ];

    let currentIndex = 0;

    function updateSlider(index) {
        // Fade out
        heroTitle.style.opacity = 0;
        heroImage.style.opacity = 0.5;
        
        setTimeout(() => {
            // Update content
            heroTitle.textContent = sliderData[index].title;
            heroImage.src = sliderData[index].image;
            
            // Update dots
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            
            // Fade in
            heroTitle.style.opacity = 1;
            heroImage.style.opacity = 1;
            heroTitle.style.transition = "opacity 0.5s ease";
            heroImage.style.transition = "opacity 0.5s ease, transform 1.5s ease";
        }, 300);
    }

    // Auto slide every 6 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % sliderData.length;
        updateSlider(currentIndex);
    }, 6000);

    // Manual dot click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider(currentIndex);
        });
    });

    // 7. Image Lazy Loading Enhancement (Optional fallback if native 'loading="lazy"' fails)
    const lazyImages = document.querySelectorAll('.lazy');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = "1";
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(image => {
        image.style.opacity = "0"; // initial state
        image.style.transition = "opacity 1s ease";
        imageObserver.observe(image);
    });
});