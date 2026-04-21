import crypto from "crypto";

export interface GICacheEntry<T = any> {
  id: string;
  key: string;
  value: T;
  createdAt: number;
  expiresAt: number | null;
}

export interface GICacheConfig {
  defaultTTL?: number;
  maxEntries?: number;
}

export class GI_CacheEngine {
  store: Map<string, GICacheEntry>;
  defaultTTL: number;
  maxEntries: number;

  constructor(config: GICacheConfig = {}) {
    this.store = new Map();
    this.defaultTTL = config.defaultTTL || 1000 * 60 * 5; // 5 minutes
    this.maxEntries = config.maxEntries || 1000;
  }

  set<T = any>(key: string, value: T, ttl: number | null = null) {
    const now = Date.now();
    const entry: GICacheEntry<T> = {
      id: crypto.randomUUID(),
      key,
      value,
      createdAt: now,
      expiresAt: ttl === null ? null : now + ttl
    };

    this.store.set(key, entry);

    if (this.store.size > this.maxEntries) {
      this.purgeOldest();
    }

    return entry;
  }

  get<T = any>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;

    if (entry.expiresAt !== null && entry.expiresAt < Date.now()) {
      this.store.delete(key);
      return null;
    }

    return entry.value as T;
  }

  delete(key: string) {
    this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }

  purgeExpired() {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (entry.expiresAt !== null && entry.expiresAt < now) {
        this.store.delete(key);
      }
    }
  }

  purgeOldest() {
    const oldest = [...this.store.values()].sort(
      (a, b) => a.createdAt - b.createdAt
    )[0];

    if (oldest) {
      this.store.delete(oldest.key);
    }
  }

  keys() {
    return [...this.store.keys()];
  }

  entries() {
    return [...this.store.values()];
  }
}

export function createGICacheEngine(config: GICacheConfig = {}) {
  return new GI_CacheEngine(config);
}

