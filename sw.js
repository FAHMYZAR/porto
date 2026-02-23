// Service Worker for instant loading
const CACHE = 'v3';
const FILES = [
  '/',
  '/index.html',
  '/article.html',
  '/dist/output.css',
  '/dist/js/common.js',
  '/dist/js/index.js',
  '/dist/js/article.js',
  '/dist/img/fahmi.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
