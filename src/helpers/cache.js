import { BRAND_NAME } from './constants';

const cacheName = `${BRAND_NAME}-cache`;

export const clearCacheData = () => {
  caches.keys().then(names => {
    names.forEach(name => {
      caches.delete(name);
    });
  });
};

export const addDataIntoCache = (url, response) => {
  // Converting our respons into Actual Response form
  const data = new Response(JSON.stringify(response));

  if ('caches' in window) {
    // Opening given cache and putting our data into it
    caches.open(cacheName).then(cache => {
      cache.put(url, data);
      alert('Data Added into cache!');
    });
  }
};

export const getSingleCacheData = async ( url) => {
  if (typeof caches === 'undefined') return false;

  const cacheStorage = await caches.open(cacheName);
  const cachedResponse = await cacheStorage.match(url);

  // If no cache exists
  if (!cachedResponse || !cachedResponse.ok) {
    setCacheData('Fetched failed!');
  }

  return cachedResponse.json().then(item => {
    setCacheData(item);
  });
};
