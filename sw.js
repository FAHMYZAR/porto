// Service Worker for instant loading
const CACHE = 'v1';
const FILES = [
  '/',
  '/index.html',
  '/dist/output.css',
  '/dist/img/fahmi.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});