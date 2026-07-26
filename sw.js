/* 筋トレログ Service Worker */
const CACHE_NAME = "kintore-v24";
const ASSETS = [
  "./index.html",
  "./style.css",
  "./app.js",
  "./icons.js",
  "./muscle.js",
  "./img/muscles_front_white.png",
  "./img/muscles_back_white.png",
  "./img/mask_f_chestup.png",
  "./img/mask_f_chestlow.png",
  "./img/mask_f_deltf.png",
  "./img/mask_f_deltm.png",
  "./img/mask_f_biceps.png",
  "./img/mask_f_forearm.png",
  "./img/mask_f_rectus.png",
  "./img/mask_f_obliques.png",
  "./img/mask_f_quads.png",
  "./img/mask_f_adductor.png",
  "./img/mask_b_traps.png",
  "./img/mask_b_lats.png",
  "./img/mask_b_erector.png",
  "./img/mask_b_deltr.png",
  "./img/mask_b_deltm.png",
  "./img/mask_b_triceps.png",
  "./img/mask_b_forearm.png",
  "./img/mask_b_glutes.png",
  "./img/mask_b_hams.png",
  "./img/mask_b_calves.png",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png",
  "./apple-touch-icon.png",
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* 通知タップでアプリを前面に */
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
      for (const c of list) {
        if ("focus" in c) return c.focus();
      }
      return self.clients.openWindow("./");
    })
  );
});

/* ネットワーク優先・失敗時キャッシュ（更新が反映されやすく、オフラインでも動く） */
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => {
        if (r) return r;
        // ナビゲーションだけindex.htmlへフォールバック（画像等にHTMLを返さない）
        if (e.request.mode === "navigate") return caches.match("./index.html");
        return Response.error();
      }))
  );
});
