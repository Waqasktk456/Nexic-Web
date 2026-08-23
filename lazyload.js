/**
 * Lightweight LazyLoad Implementation for NexicWeb
 * Loads images only when they're about to enter viewport
 */

(function() {
  'use strict';
  
  // Check for native lazy loading support
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
    return;
  }
  
  // Fallback for browsers without native lazy loading
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if (!lazyImages.length) return;
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // Load the image
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add('loaded');
          
          // Remove data-src after loading
          img.removeAttribute('data-src');
        }
        
        // Stop observing this image
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px', // Start loading 50px before entering viewport
    threshold: 0.01
  });
  
  // Observe all lazy images
  lazyImages.forEach(img => imageObserver.observe(img));
  
  // Fallback for older browsers without IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    lazyImages.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  }
})();
