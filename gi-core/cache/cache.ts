export class Cache {
  private store: Map<string, { value: any; expires: number | null }> = new Map();

  set(key: string, value: any, ttlMs: number | null = null) {
    const expires = ttlMs ? Date.now() + ttlMs : null;
    this.store.set(key, { value, expires });
  }

  get(key: string) {
    const entry = this.store.get(key);
    if (!entry) return null;

    if (entry.expires !== null && entry.expires < Date.now()) {
      this.store.delete(key);
      return null;
    }

    return entry.value;
  }

  has(key: string) {
    const entry = this.store.get(key);
    if (!entry) return false;

    if (entry.expires !== null && entry.expires < Date.now()) {
      this.store.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string) {
    this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }
}

