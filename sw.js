const C='taviamo-v7';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','icon.svg','manifest.webmanifest'])))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);
// Only handle same-origin GETs; cross-origin (Pollinations images, AI APIs, tesseract CDN) go straight to the network.
if(e.request.method!=='GET'||u.origin!==self.location.origin)return;
e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match(new URL('./',self.location).href))))});
