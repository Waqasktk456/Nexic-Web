/* /script.js */
document.addEventListener("DOMContentLoaded", () => {
    
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis Smooth Scroll
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

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Connect GSAP to Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0, 0);

    // Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    const hoverTargets = document.querySelectorAll('.hover-target, button, a');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant dot movement
        gsap.set(cursorDot, { x: mouseX, y: mouseY });
    });

    // Smooth ring follow using requestAnimationFrame
    const speed = 0.15;
    function animateCursor() {
        ringX += (mouseX - ringX) * speed;
        ringY += (mouseY - ringY) * speed;
        gsap.set(cursorRing, { x: ringX, y: ringY });
        requestAnimationFrame(animateCursor);
    }
    if (window.innerWidth > 768) animateCursor();

    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
        target.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
    });

    // Hero Initial Animations
    const tlHero = gsap.timeline();
    tlHero.from('.hero-label', { y: 20, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.5 })
          .from('.hero-title', { y: 50, opacity: 0, duration: 1.2, stagger: 0.2, ease: 'power4.out' }, "-=0.5")
          .from('.hero-desc, .cta-group', { y: 20, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }, "-=0.8")
          .from('.scroll-indicator', { opacity: 0, duration: 1 }, "-=0.5");

    // Parallax Rings on Mouse Move
    const rings = document.querySelector('.holographic-rings');
    window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.clientX) * 0.05;
        const y = (window.innerHeight / 2 - e.clientY) * 0.05;
        gsap.to(rings, { x: x, y: y, duration: 1, ease: 'power2.out' });
    });

    // Terminal Typewriter Effect
    const termLines = [
        "INITIALIZING CORE SYSTEMS...",
        "LOADING UI MODULES... [OK]",
        "ESTABLISHING SECURE CONNECTION...",
        "DECRYPTING ASSETS...",
        "> ACCESS GRANTED.",
        "> WELCOME TO NEXUS_OS."
    ];
    const termOutput = document.getElementById('term-output');
    
    ScrollTrigger.create({
        trigger: "#terminal",
        start: "top 80%",
        onEnter: () => {
            if(!termOutput.classList.contains('typed')) {
                termOutput.classList.add('typed');
                let delay = 0;
                termLines.forEach((line, index) => {
                    setTimeout(() => {
                        termOutput.innerHTML += `<div>${line}</div>`;
                    }, delay);
                    delay += Math.random() * 400 + 200;
                });
            }
        }
    });

    // Services Orbiting Setup
    const modules = document.querySelectorAll('.service-module');
    const radius = window.innerWidth < 768 ? 140 : 250;
    const totalModules = modules.length;
    
    modules.forEach((mod, i) => {
        const angle = (i / totalModules) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        gsap.set(mod, { x: x, y: y });
        
        // Slow floating animation
        gsap.to(mod, {
            y: y + (Math.random() * 30 - 15),
            x: x + (Math.random() * 30 - 15),
            duration: 3 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });

    // Portfolio Horizontal Scroll
    const portfolioSection = document.querySelector("#portfolio");
    const portfolioWrapper = document.querySelector(".portfolio-scroll-wrapper");
    const portfolioTrack = document.querySelector(".portfolio-track");

    let scrollTween = gsap.to(portfolioTrack, {
        x: () => -(portfolioTrack.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
            trigger: portfolioSection,
            pin: true,
            scrub: 1,
            end: () => "+=" + portfolioTrack.scrollWidth
        }
    });

    // Storytelling Scroll Reveal
    const storyLines = document.querySelectorAll('.story-line');
    storyLines.forEach((line) => {
        gsap.to(line, {
            opacity: 1,
            y: 0,
            scrollTrigger: {
                trigger: line,
                start: "top 70%",
                end: "top 40%",
                scrub: 1
            }
        });
    });

    // 3D Tilt Effect for Team & Pricing Cards
    const tiltCards = document.querySelectorAll('.team-card, .price-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                ease: "power1.out",
                duration: 0.5
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                ease: "power3.out",
                duration: 1
            });
        });
    });

    // Duplicate Testimonials for Seamless Marquee
    const testTrack = document.querySelector('.testimonial-track');
    const clones = testTrack.innerHTML;
    testTrack.innerHTML += clones; // Duplicate to create loop length

    // Footer Parallax Text
    gsap.to('.giant-footer-text', {
        y: -100,
        opacity: 0.8,
        scrollTrigger: {
            trigger: '#footer',
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1
        }
    });
});