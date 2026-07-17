// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// 1. Initialize Lenis for Smooth Scrolling
const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium smooth curve
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Sync GSAP ScrollTrigger with Lenis
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// 2. Custom Cursor & Spotlight Track
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Update CSS variables for spotlight effect
    document.documentElement.style.setProperty('--mouse-x', `${x}px`);
    document.documentElement.style.setProperty('--mouse-y', `${y}px`);

    // Move cursor dots using GSAP for smoothness
    gsap.to(cursor, { x: x, y: y, duration: 0, ease: "power2.out" });
    gsap.to(cursorFollower, { x: x, y: y, duration: 0.3, ease: "power2.out" });
});

// Magnetic Hover effect for links and menu items
const magneticElements = document.querySelectorAll('.menu-item, .magnetic');
magneticElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursorFollower, { width: 60, height: 60, backgroundColor: 'rgba(255,255,255,0.1)', duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursorFollower, { width: 40, height: 40, backgroundColor: 'transparent', duration: 0.3 });
        gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: "power2.out" }); // reset position if moved
    });
});

// 3. Loading Screen & Intro Animation
window.addEventListener('load', () => {
    const tl = gsap.timeline();

    tl.to('.loader', {
        opacity: 0,
        duration: 1,
        ease: 'power3.inOut',
        onComplete: () => document.querySelector('.loader').style.display = 'none'
    })
    .from('.hero-circle-img', {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out'
    }, '-=0.5')
    .from('.hero-title, .subtitle', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out'
    }, '-=1')
    .from('.menu-item', {
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    }, '-=0.8');
});

// 4. Scroll Animations (ScrollTrigger)
// Text split animations for About
const splitText = new SplitType('.about-text', { types: 'lines, words' });
gsap.from(splitText.words, {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 70%',
    },
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.01,
    ease: 'power3.out'
});

// Parallax Image
gsap.to('.portrait-wrapper img', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
    },
    y: 50, // Parallax amount
    ease: 'none'
});

// Projects Stagger
gsap.from('.project-card', {
    scrollTrigger: {
        trigger: '.projects',
        start: 'top 60%',
    },
    y: 100,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: 'power4.out'
});

// Contact Section scale reveal
gsap.from('.huge-text', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top 80%',
    },
    scale: 0.8,
    opacity: 0,
    duration: 1.5,
    ease: 'power3.out'
});