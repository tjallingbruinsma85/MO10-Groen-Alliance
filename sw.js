// Service worker that always fetches fresh — no caching
self.addEventListener('install', function() { self.skipWaiting(); });
self.addEventListener('activate', function(event) {
  // Delete ALL caches
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) { return caches.delete(k); }));
    })
  );
  self.clients.claim();
});
self.addEventListener('fetch', function(event) {
  // Always go to network, never cache
  event.respondWith(fetch(event.request));
});
