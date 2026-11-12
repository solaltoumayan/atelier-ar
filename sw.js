// Atelier Meubles : réseau d'abord, sans le cache de 10 min de GitHub Pages (toujours la dernière version), copie de secours pour ouvrir l'app sans réseau.
const C = 'atelier-v11';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const same = new URL(r.url).origin === location.origin; // (une requête de navigation ne peut pas recevoir d'options : on refait la requête par son adresse)
  e.respondWith((same ? fetch(r.url, { cache: 'no-cache', credentials: 'same-origin' }) : fetch(r)).then(res => { if (res.ok && (res.type === 'basic' || res.type === 'cors')) { const cp = res.clone(); caches.open(C).then(c => c.put(r, cp)); } return res; })
    .catch(() => caches.match(r, { ignoreSearch: true }).then(m => m || Response.error())));
});
