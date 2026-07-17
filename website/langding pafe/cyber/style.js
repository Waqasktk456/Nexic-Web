document.addEventListener("DOMContentLoaded", () => {
    
    // 1. PRELOADER LOGIC
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 800); // Artificial delay to show the cool loading animation
    });

    // 2. STICKY NAVBAR WITH BLUR EFFECT
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. GENERATE CYBER PARTICLES BACKGROUND
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
        let particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Randomize size, position, and animation duration
        let size = Math.random() * 4 + 1; // 1px to 5px
        let posX = Math.random() * 100; // 0% to 100% vw
        let duration = Math.random() * 10 + 5; // 5s to 15s
        let delay = Math.random() * 10; // 0s to 10s

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}vw`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        particlesContainer.appendChild(particle);
    }

    // 4. MOUSE PARALLAX EFFECT FOR HERO & IMAGES
    document.addEventListener("mousemove", parallax);
    function parallax(e) {
        // Only run parallax on desktop to save mobile performance
        if(window.innerWidth > 991) {
            document.querySelectorAll(".parallax").forEach(function(move){
                var moving_value = move.getAttribute("data-speed");
                var x = (e.clientX * moving_value) / 100;
                var y = (e.clientY * moving_value) / 100;
                
                move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
            });
        }
    }

    // 5. INTERSECTION OBSERVER FOR SCROLL REVEAL ANIMATIONS
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 6. ANIMATED NUMBER COUNTERS (Triggered on scroll)
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            // Format number based on size
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCounter();
                });
                hasCounted = true; // prevent recounting
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    // Observe the results section to trigger counting
    const resultsSection = document.getElementById('results');
    if(resultsSection) {
        counterObserver.observe(resultsSection);
    }

    // 7. DASHBOARD BARS ANIMATION RESET ON SCROLL
    const chartBars = document.querySelectorAll('.bar');
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                chartBars.forEach(bar => {
                    let height = bar.style.height;
                    bar.style.height = '0%';
                    setTimeout(() => {
                        bar.style.height = height;
                    }, 200);
                });
                chartObserver.disconnect();
            }
        });
    }, {threshold: 0.5});
    
    const dashboard = document.querySelector('.dashboard-mockup');
    if(dashboard) {
        chartObserver.observe(dashboard);
    }
});