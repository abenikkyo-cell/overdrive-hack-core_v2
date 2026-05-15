const CACHE_NAME = 'hackcore-v2';
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
];

// インストール時に全アセットをキャッシュ
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// 古いキャッシュを削除
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// キャッシュ優先で応答（オフライン対応）
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
