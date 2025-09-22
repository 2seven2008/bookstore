const CACHE_NAME = "bookstore-cache-v1";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/app.js",
  "./img/Img/logoMobileMaior.svg",
  "./img/Img/logoMobile.svg",
];

// Instala e faz cache dos assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Intercepta requisições
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
