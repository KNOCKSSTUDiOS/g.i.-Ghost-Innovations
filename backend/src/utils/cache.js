const CACHE = new Map();

export function cacheSet(key, value, ttl = 0) {
  const expires = ttl > 0 ? Date.now() + ttl : null;
  CACHE.set(key, { value, expires });
  return true;
}

export function cacheGet(key) {
  const entry = CACHE.get(key);
  if (!entry) return null;

  if (entry.expires && entry.expires < Date.now()) {
    CACHE.delete(key);
    return null;
  }

  return entry.value;
}

export function cacheDelete(key) {
  return CACHE.delete(key);
}

export function cacheClear() {
  CACHE.clear();
}
