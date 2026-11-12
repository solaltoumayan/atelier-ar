// Atelier Meubles : réseau d'abord, sans le cache de 10 min de GitHub Pages (toujours la dernière version), copie de secours pour ouvrir l'app sans réseau.
const C = 'atelier-v10';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  e.respondWith(fetch(r, new URL(r.url).origin === location.origin ? { cache: 'no-cache' } : {}).then(res => { if (res.ok && (res.type === 'basic' || res.type === 'cors')) { const cp = res.clone(); caches.open(C).then(c => c.put(r, cp)); } return res; })
    .catch(() => caches.match(r, { ignoreSearch: true }).then(m => m || Response.error())));
});
