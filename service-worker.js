importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([
  { url: './', revision: '1' },
  { url: './manifest.json', revision: '1' },
  { url: './index.js', revision: '1' },
  { url: './index.html', revision: '1' },
  { url: './push.js', revision: '1' },
  { url: './images/icon-16x16.png', revision: '1' },
  { url: './images/icon-32x32.png', revision: '1' },
  { url: './images/icon-96x96.png', revision: '1' },
  { url: './images/icon-192x192.png', revision: '1' },
  { url: './images/icon-512x512.png', revision: '1' },
  { url: './styles/materialize.min.css', revision: '1' },
  { url: './scripts/data/data-favorites.js', revision: '1' },
  { url: './scripts/data/data-standings.js', revision: '1' },
  { url: './scripts/data/data-teams.js', revision: '1' },
  { url: './scripts/libs/idb.js', revision: '1' },
  { url: './scripts/libs/materialize.min.js', revision: '1' },
  { url: './scripts/routes/routes.js', revision: '1' },
  { url: './scripts/routes/url-parser.js', revision: '1' },
  { url: './scripts/utils/drawer-initiator.js', revision: '1' },
  { url: './scripts/utils/notif-register.js', revision: '1' },
  { url: './scripts/utils/sw-register.js', revision: '1' },
  { url: './scripts/utils/urlBase64ToUint8Array.js', revision: '1' },
  { url: './scripts/view/App.js', revision: '1' },
  { url: './scripts/view/pages/details.js', revision: '1' },
  { url: './scripts/view/pages/favorites.js', revision: '1' },
  { url: './scripts/view/pages/standings.js', revision: '1' },
  { url: './scripts/view/pages/teams.js', revision: '1' }
]);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60
      })
    ]
  })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-font-stylesheets'
  })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp('https://crests.football-data.org/'),
  workbox.strategies.staleWhileRevalidate()
);

self.addEventListener('push', event => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload!';
  }

  event.waitUntil(
    self.registration.showNotification('Push Notification', {
      body: body,
      icon: './images/icon-192x192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    })
  );
});
