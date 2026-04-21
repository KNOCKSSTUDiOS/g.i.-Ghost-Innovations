import crypto from "crypto";

export interface GIStateSlice<T = any> {
  id: string;
  key: string;
  value: T;
  createdAt: number;
  updatedAt: number;
}

export interface GIStateSubscriber<T = any> {
  id: string;
  fn: (value: T) => void;
  createdAt: number;
}

export class GI_StateEngine {
  private slices: Map<string, GIStateSlice>;
  private subscribers: Map<string, GIStateSubscriber<any>[]>;

  constructor() {
    this.slices = new Map();
    this.subscribers = new Map();
  }

  // ---------- CREATE ----------
  createSlice<T>(key: string, initial: T): GIStateSlice<T> {
    const slice: GIStateSlice<T> = {
      id: crypto.randomUUID(),
      key,
      value: initial,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    this.slices.set(key, slice);
    this.subscribers.set(key, []);

    return slice;
  }

  // ---------- GET ----------
  get<T = any>(key: string): T | null {
    const slice = this.slices.get(key);
    return slice ? (slice.value as T) : null;
  }

  // ---------- SET ----------
  set<T = any>(key: string, value: T) {
    const slice = this.slices.get(key);
    if (!slice) return;

    slice.value = value;
    slice.updatedAt = Date.now();
    this.emit(key, value);
  }

  // ---------- UPDATE ----------
  update<T = any>(key: string, fn: (prev: T) => T) {
    const slice = this.slices.get(key);
    if (!slice) return;

    slice.value = fn(slice.value as T);
    slice.updatedAt = Date.now();
    this.emit(key, slice.value);
  }

  // ---------- SUBSCRIBE ----------
  subscribe<T = any>(key: string, fn: (value: T) => void): GIStateSubscriber<T> | null {
    if (!this.slices.has(key)) return null;

    const sub: GIStateSubscriber<T> = {
      id: crypto.randomUUID(),
      fn,
      createdAt: Date.now()
    };

    this.subscribers.get(key)!.push(sub);
    return sub;
  }

  unsubscribe(key: string, id: string) {
    if (!this.subscribers.has(key)) return;
    const list = this.subscribers.get(key)!;
    this.subscribers.set(
      key,
      list.filter(s => s.id !== id)
    );
  }

  // ---------- SNAPSHOT ----------
  snapshot() {
    const out: Record<string, any> = {};
    for (const [key, slice] of this.slices.entries()) {
      out[key] = slice.value;
    }
    return out;
  }

  // ---------- INTERNAL ----------
  private emit<T>(key: string, value: T) {
    const list = this.subscribers.get(key) || [];
    for (const sub of list) {
      try {
        sub.fn(value);
      } catch {
        // state updates must never break the engine
      }
    }
  }
}

export function createGIStateEngine() {
  return new GI_StateEngine();
}
