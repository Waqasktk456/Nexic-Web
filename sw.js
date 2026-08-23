// Service Worker for NexicWeb - Caches resources for faster loading
const CACHE_VERSION = 'nexicweb-v1';
const STATIC_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/config.js',
  '/auth.js'
];

// Install event - cache static resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(STATIC_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_VERSION)
          .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(event.request).then(response => {
          // Don't cache if not a success response
          if (!response || response.status !== 200) {
            return response;
          }
          
          // Clone the response
          const responseToCache = response.clone();
          
          caches.open(CACHE_VERSION).then(cache => {
            cache.put(event.request, responseToCache);
          });
          
          return response;
        });
      })
      .catch(() => {
        // Return offline page if available
        return caches.match('/index.html');
      })
  );
});
