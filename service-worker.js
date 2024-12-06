const version = 1.01
const cacheVersion = 2
const CACHE_NAME = 'AquaRooms-v' + cacheVersion 

const urlsToCache = [
    '/',
    '/images/192x192.png',
    '/images/512x512.png',
    '/images/apple-touch-icon.png',
    '/images/icon.png',
    '/images/facebook.svg',    
    '/images/instagram.svg',
    '/images/youtube.svg',
    '/images/logo.svg',
    '/images/arrow_top.svg',
    '/salle1.webp',
    '/salle2.webp',
    '/salle3.webp',
    '/salle4.webp',
    '/index.html',
    '/manifest.json',
    '/index_files/animation.css',
    '/index_files/blocgrid.css',
    '/index_files/galerie.css',
    '/index_files/global.css',
    '/index_files/page.css',
    '/index_files/rgpd.css',    
    '/index_files/rgpd.js',
    '/index_files/custom.js',
    '/index_files/jquery.min.js'

];

// ServiceWorker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
    return self.skipWaiting()
});

self.addEventListener('activate', event => {
    let oldVersion = cacheVersion - 1
    event.waitUntil(
        caches.has('AquaRooms-v' + oldVersion)
        .then(exists => {
            if(exists) {
                caches.delete('AquaRooms-v' + oldVersion).then(() => {
                console.log('Cache supprimé : AquaRooms-v' + oldVersion)
                })
            }
      })
    )
    return self.clients.claim()
  })
  
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});