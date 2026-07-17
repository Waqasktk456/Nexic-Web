document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Preloader Logic
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            initGSAP(); // Initialize animations after load
        }, 800);
    }, 2000);

    // 2. Custom Cursor (Mouse Follower Glow)
    const cursor = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Expand cursor on interactive elements
    const interactives = document.querySelectorAll('a, button, .car-card');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '400px';
            cursor.style.height = '400px';
            cursor.style.background = 'radial-gradient(circle, rgba(0, 102, 177, 0.25) 0%, rgba(0,0,0,0) 60%)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '300px';
            cursor.style.height = '300px';
            cursor.style.background = 'radial-gradient(circle, rgba(0, 102, 177, 0.15) 0%, rgba(0,0,0,0) 60%)';
        });
    });

    // 3. Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = `translate(0px, 0px)`;
        });
    });

    // 4. Navbar Scroll State
    const navbar = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 5. GSAP Animations Initialization
    function initGSAP() {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Text Fade Up
        gsap.fromTo(".fade-up", 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
        );

        // General Section Reveals
        const revealElements = document.querySelectorAll('.gs-reveal');
        revealElements.forEach((el) => {
            gsap.fromTo(el, 
                { y: 50, opacity: 0 },
                {
                    y: 0, 
                    opacity: 1, 
                    duration: 1, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%", // Triggers when top of element hits 85% of viewport
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // 6. Horizontal Scroll Section (Apple-style)
        const horizContainer = document.querySelector('.horizontal-container');
        const horizWrap = document.querySelector('.horizontal-wrap');
        
        if (horizContainer && horizWrap) {
            gsap.to(horizWrap, {
                x: () => -(horizWrap.scrollWidth - window.innerWidth) + "px",
                ease: "none",
                scrollTrigger: {
                    trigger: horizContainer,
                    start: "top top",
                    end: () => "+=" + (horizWrap.scrollWidth - window.innerWidth),
                    pin: true,
                    scrub: 1, // Smooth scrubbing
                    invalidateOnRefresh: true
                }
            });
        }

        // 7. Technology Progress Bars & Counters
        ScrollTrigger.create({
            trigger: "#technology",
            start: "top 75%",
            onEnter: () => {
                // Progress Bars
                document.querySelectorAll('.progress-bar').forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                    bar.style.transition = "width 1.5s ease-out";
                });
                
                // Number Counter
                const counter = document.querySelector('.counter');
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const updateCount = () => {
                    const increment = target / 50;
                    if(count < target) {
                        count += increment;
                        counter.innerText = Math.ceil(count);
                        setTimeout(updateCount, 30);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            },
            once: true
        });
    }
});