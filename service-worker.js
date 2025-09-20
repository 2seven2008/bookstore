const CACHE_NAME = 'pwa-v1';
const urlsToCache = [
    '/',
    '/style.css',
    '/app.js',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
    console.log('Service Worker instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache aberto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Intercepta requisições
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Retorna do cache se encontrado, senão faz a requisição
                return response || fetch(event.request);
            })
    );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
    console.log('Service Worker ativado');
    // Remove caches antigos
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Removendo cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});