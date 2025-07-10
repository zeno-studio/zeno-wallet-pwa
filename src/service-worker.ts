/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope;
declare let caches: CacheStorage;

import { build, files, version } from '$service-worker';

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

// Define assets to cache (build and files from static directory)
const ASSETS = [
  ...build, // the app itself
  ...files  // everything in `static`
];

self.addEventListener('install', (event) => {
  // Create a new cache and add all files to it
  async function addFilesToCache() {
    const cache = await caches.open(CACHE);
    await cache.addAll(ASSETS);
  }

  event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
  // Remove previous cached data from disk
  async function deleteOldCaches() {
    for (const key of await caches.keys()) {
      if (key !== CACHE) await caches.delete(key);
    }
  }

  event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (event) => {
  // Ignore non-GET requests
  if (event.request.method !== 'GET') return;

  // Only handle requests for assets defined in ASSETS
  const url = new URL(event.request.url);
  if (!ASSETS.includes(url.pathname)) {
    // Skip external resources (e.g., NFT images) and non-asset requests
    return;
  }

  async function respond() {
    const cache = await caches.open(CACHE);
    // Serve from cache if available
    const response = await cache.match(url.pathname);
    if (response) {
      return response;
    }

    // Fetch from network and cache if successful
    try {
      const networkResponse = await fetch(event.request);
      if (!(networkResponse instanceof Response)) {
        throw new Error('Invalid response from fetch');
      }

      if (networkResponse.status === 200) {
        cache.put(event.request, networkResponse.clone());
      }

      return networkResponse;
    } catch (err) {
      // If fetch fails and no cache, throw error
      throw err;
    }
  }

  event.respondWith(respond());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});