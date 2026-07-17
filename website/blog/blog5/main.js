/* ========================================
   LENIS SMOOTH SCROLL INIT
======================================== */
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

/* ========================================
   GSAP REGISTRATION
======================================== */
gsap.registerPlugin(ScrollTrigger);

/* Sync Lenis with GSAP ScrollTrigger */
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

/* ========================================
   CUSTOM CURSOR LOGIC
======================================== */
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const hoverTargets = document.querySelectorAll('.hover-target, a, button');

// Only run cursor logic on non-touch devices
if (window.matchMedia("(pointer: fine)").matches) {
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant dot movement
        gsap.to(cursorDot, {
            x: mouseX,
            y: mouseY,
            duration: 0,
        });
    });

    // Smooth outline trailing
    gsap.ticker.add(() => {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        gsap.set(cursorOutline, {
            x: outlineX,
            y: outlineY
        });
    });

    // Hover scale effect
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        target.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
}

/* ========================================
   TEXT SPLITTING UTILITY (Vanilla JS)
======================================== */
const splitTextElements = document.querySelectorAll('.split-text');
splitTextElements.forEach(elem => {
    const text = elem.innerText;
    elem.innerHTML = '';
    
    // Split by words then characters to maintain layout
    const words = text.split(' ');
    words.forEach((word, wordIndex) => {
        const wordDiv = document.createElement('div');
        wordDiv.style.display = 'inline-block';
        wordDiv.style.overflow = 'hidden'; // For reveal up
        
        const chars = word.split('');
        chars.forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.className = 'char';
            charSpan.innerText = char;
            wordDiv.appendChild(charSpan);
        });
        
        elem.appendChild(wordDiv);
        
        // Add space after word unless it's the last one
        if (wordIndex < words.length - 1) {
            elem.innerHTML += '&nbsp;';
        }
    });
});

/* ========================================
   GSAP ANIMATIONS
======================================== */

// 1. Hero Entrance Animation
window.addEventListener('load', () => {
    const heroTl = gsap.timeline();
    
    // Animate characters up
    heroTl.to('.hero-title .char', {
        y: '0%',
        opacity: 1,
        duration: 1,
        stagger: 0.03,
        ease: 'power4.out',
        delay: 0.2
    })
    .fromTo('.reveal-elem', {
        y: 30,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out'
    }, "-=0.8")
    .fromTo('.hero-img-wrapper', {
        scale: 1.2,
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)'
    }, {
        scale: 1,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1.5,
        ease: 'power4.inOut'
    }, "-=1.2");
});

// 2. Parallax Hero Image on Scroll
gsap.to('.hero-img-wrapper img', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});

// 3. Scroll Reveal Elements (Fade Up)
const revealElements = document.querySelectorAll('.reveal-up');
revealElements.forEach(elem => {
    gsap.fromTo(elem, {
        y: 50,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });
});

// 4. Immersive Story (Sticky & Crossfade Steps)
const storySteps = gsap.utils.toArray('.story-step');
const storyImg = document.querySelector('.story-img');

if(storySteps.length > 0) {
    // Zoom image slightly on scroll
    gsap.to(storyImg, {
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
            trigger: '.immersive-story',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
        }
    });

    // Fade in/out text steps
    storySteps.forEach((step, i) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.immersive-story',
                start: () => `top+=${i * window.innerHeight} top`,
                end: () => `top+=${(i + 1) * window.innerHeight} top`,
                scrub: true,
            }
        });
        
        tl.to(step, { opacity: 1, duration: 0.2, y: 0 })
          .to(step, { opacity: 0, duration: 0.2, y: -20 }, "+=0.6");
    });
}

// 5. Section Header Lines Expansion
const sectionLines = document.querySelectorAll('.section-line');
sectionLines.forEach(line => {
    gsap.fromTo(line, 
        { scaleX: 0, transformOrigin: 'left center' },
        { 
            scaleX: 1, 
            duration: 1.5, 
            ease: 'power4.out',
            scrollTrigger: {
                trigger: line,
                start: 'top 90%'
            }
        }
    );
});

/* ========================================
   INTERACTIVE BENTO GRID GLOW (Mouse follow)
======================================== */
const glowCards = document.querySelectorAll('.mouse-glow');
glowCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});