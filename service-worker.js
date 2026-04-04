/**
 * FairSplit Service Worker
 * Enables offline functionality for the equity calculator and other tools
 * @version 1.0.0
 */

const CACHE_NAME = 'fairsplit-v1';
const STATIC_CACHE = 'fairsplit-static-v1';
const DYNAMIC_CACHE = 'fairsplit-dynamic-v1';

// Core assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/pricing.html',
  '/blog.html',
  '/generator.html',
  '/vesting-calculator.html',
  '/quiz.html',
  '/scenario-compare.html',
  '/affiliates.html',
  '/thank-you.html',
  '/offline.html',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[Service Worker] Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[Service Worker] Cache failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => {
              return name.startsWith('fairsplit-') && 
                     name !== STATIC_CACHE && 
                     name !== DYNAMIC_CACHE;
            })
            .map((name) => {
              console.log('[Service Worker] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[Service Worker] Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests (only cache same-origin)
  if (url.origin !== self.location.origin) {
    return;
  }
  
  // Handle different request types
  if (isStaticAsset(request)) {
    event.respondWith(cacheFirst(request));
  } else if (isPageRequest(request)) {
    event.respondWith(networkFirstWithFallback(request));
  } else {
    event.respondWith(staleWhileRevalidate(request));
  }
});

/**
 * Check if request is for a static asset
 */
function isStaticAsset(request) {
  const staticExtensions = [
    '.js', '.css', '.json', '.xml',
    '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico',
    '.woff', '.woff2', '.ttf', '.eot'
  ];
  return staticExtensions.some(ext => request.url.endsWith(ext));
}

/**
 * Check if request is for an HTML page
 */
function isPageRequest(request) {
  return request.headers.get('accept')?.includes('text/html') ||
         request.url.endsWith('.html') ||
         request.url.endsWith('/');
}

/**
 * Cache-first strategy for static assets
 * Fastest response, assets don't change often
 */
async function cacheFirst(request) {
  const cached = await caches.match(request);
  
  if (cached) {
    // Update cache in background (stale-while-revalidate)
    fetch(request)
      .then((response) => {
        if (response.ok) {
          caches.open(STATIC_CACHE)
            .then((cache) => cache.put(request, response));
        }
      })
      .catch(() => {});
    
    return cached;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('[Service Worker] Cache-first failed:', error);
    throw error;
  }
}

/**
 * Network-first strategy with offline fallback for pages
 * Try network first, fallback to cache, then offline page
 */
async function networkFirstWithFallback(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Update cache with fresh content
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Network response not OK');
  } catch (error) {
    console.log('[Service Worker] Network failed, trying cache:', request.url);
    
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    
    // Return offline page for HTML requests
    const offlinePage = await caches.match('/offline.html');
    if (offlinePage) {
      return offlinePage;
    }
    
    throw error;
  }
}

/**
 * Stale-while-revalidate for dynamic content
 * Serve cached version immediately, update in background
 */
async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  
  const networkPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        caches.open(DYNAMIC_CACHE)
          .then((cache) => cache.put(request, response.clone()));
      }
      return response;
    })
    .catch(() => null);
  
  return cached || networkPromise || new Response('Offline', { status: 503 });
}

// Handle background sync for offline form submissions (future feature)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-email-capture') {
    event.waitUntil(syncEmailCapture());
  }
});

async function syncEmailCapture() {
  // Placeholder for future email sync functionality
  console.log('[Service Worker] Background sync triggered');
}

// Handle push notifications (future feature)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/assets/icons/icon-192x192.png',
        badge: '/assets/icons/icon-72x72.png',
        tag: data.tag || 'default',
        requireInteraction: data.requireInteraction || false,
        data: data.url || '/'
      })
    );
  }
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data || '/')
  );
});

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
  
  if (event.data === 'getCacheStatus') {
    caches.keys().then((cacheNames) => {
      event.ports[0].postMessage({
        caches: cacheNames,
        timestamp: new Date().toISOString()
      });
    });
  }
});

console.log('[Service Worker] Registered successfully');
