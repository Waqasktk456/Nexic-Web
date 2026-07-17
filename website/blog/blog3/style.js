// script.js
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. INITIALIZE LENIS (Smooth Scroll)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 2. CUSTOM CURSOR LOGIC (Hardware Accelerated & Bug-free)
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let followerX = mouseX;
    let followerY = mouseY;
    let isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    if (!isTouchDevice) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, { passive: true });

        const renderCursor = () => {
            // Instant tracking for inner cursor
            cursorX += (mouseX - cursorX) * 1;
            cursorY += (mouseY - cursorY) * 1;
            
            // Smooth tracking for outer follower
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;

            // Use 3D transforms for GPU acceleration
            cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
            follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;

            requestAnimationFrame(renderCursor);
        };
        requestAnimationFrame(renderCursor);

        // Hover state logic for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .card-hover, [data-magnetic]');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    // 3. MAGNETIC BUTTONS (Smooth Math based movement)
    const magneticEls = document.querySelectorAll('[data-magnetic]');
    magneticEls.forEach((el) => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(el, {
                x: x * 0.2,
                y: y * 0.2,
                duration: 0.6,
                ease: "power3.out"
            });
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });

    // 4. NAVBAR BLUR & SCROLL EFFECT
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.85)';
            navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.08)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.03)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.5)';
            navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.04)';
            navbar.style.boxShadow = 'none';
        }
    }, { passive: true });

    // 5. GSAP ANIMATIONS & SCROLLTRIGGERS

    // Hero Entry Animation
    const heroTl = gsap.timeline();
    heroTl.fromTo('.hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 })
          .fromTo('.title-line', { opacity: 0, y: 40, rotationX: -20 }, { opacity: 1, y: 0, rotationX: 0, duration: 1, stagger: 0.15, ease: "power4.out" }, "-=0.6")
          .fromTo('.hero-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
          .fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
          .fromTo('.dashboard-mockup', { opacity: 0, y: 80, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "expo.out" }, "-=0.4");

    // Hero Scroll Parallax
    gsap.to('.dashboard-mockup', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: "top top",
            end: "bottom top",
            scrub: 1,
        },
        y: 100,
        rotationX: 5,
        ease: "none"
    });

    // Section Titles Fade In
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        gsap.fromTo(header, 
            { opacity: 0, y: 40 },
            { 
                opacity: 1, y: 0, duration: 1, ease: "power3.out",
                scrollTrigger: { trigger: header, start: "top 85%" }
            }
        );
    });

    // Bento Grid Stagger
    gsap.fromTo('.bento-card', 
        { opacity: 0, y: 50 },
        {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: '.bento-grid', start: "top 80%" }
        }
    );

    // AI Visual Parallax & Reveal
    gsap.fromTo('.ai-card',
        { opacity: 0, x: 50 },
        {
            opacity: 1, x: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: '.ai-visual', start: "top 80%" }
        }
    );

    // Testimonial Marquee Setup
    const track = document.querySelector('.testimonial-track');
    // Duplicate content for seamless loop
    track.innerHTML += track.innerHTML;
    
    gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: 30,
        repeat: -1,
    });

    // Pricing Cards Stagger
    gsap.fromTo('.pricing-card', 
        { opacity: 0, y: 40 },
        {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: '.pricing-grid', start: "top 80%" }
        }
    );

    // 6. INTERACTIVE COMPONENTS

    // Pricing Toggle
    const pricingToggle = document.querySelector('.pricing-toggle');
    const prices = document.querySelectorAll('.price');
    let isAnnual = false;
    
    // Default monthly values
    const monthlyPrices = ["$0", "$29", "Custom"];
    const annualPrices = ["$0", "$24", "Custom"];

    if (pricingToggle) {
        pricingToggle.addEventListener('click', () => {
            isAnnual = !isAnnual;
            pricingToggle.classList.toggle('annual');
            
            prices.forEach((priceEl, index) => {
                const targetPrice = isAnnual ? annualPrices[index] : monthlyPrices[index];
                if(targetPrice !== "Custom") {
                    priceEl.innerHTML = `${targetPrice}<span>/mo</span>`;
                } else {
                    priceEl.innerHTML = targetPrice;
                }
                
                // Animate price change
                gsap.fromTo(priceEl, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.4 });
            });
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // 7. PERFORMANCE OPTIMIZATIONS (Window Resize handling)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });

});