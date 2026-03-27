const CACHE_NAME = 'jestudios-budget-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Install Service Worker & Cache Files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercept requests (Syarat wajib PWA)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
