const CACHE_NAME = 'hackcore-v5';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './BG1.png',
  './bgm_game.mp3',
  './se_select.mp3',
  './se_initialize.mp3',
  './se_match.mp3',
  './se_combo.mp3',
  './se_rensa.mp3',
  './se_overdrive.mp3',
  './se_virus.mp3',
  './se_virus_hit.mp3',
  './se_bomb_explode.mp3',
  './se_gameover.mp3',
  './panel_red.png',
  './panel_blue.png',
  './panel_purple.png',
  './panel_green.png',
  './panel_virus.png',
  './panel_bomb.png',
  './panel_corrupt.png',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
