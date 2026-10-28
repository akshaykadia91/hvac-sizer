// Retired: the Psychrometric Calculator now lives inside HVAC Sizer (Psychro tab).
// This worker removes its old offline cache and unregisters itself, so the main app's worker takes over.
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf("psychrometric-") === 0; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.registration.unregister(); }));
});
