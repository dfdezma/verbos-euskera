const CACHE_NAME = 'verbos-euskera-cache-v1';
const urlsToCache = [
  './',
  './manifest.json',
  './', // index.html
  // Aquí añade rutas a recursos estáticos que uses (imágenes, CSS, etc.)
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activación y limpieza de caches viejas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
    ))
  );
});

// Interceptar peticiones y responder desde cache si existe
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
