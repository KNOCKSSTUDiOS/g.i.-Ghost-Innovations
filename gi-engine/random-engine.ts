import crypto from "crypto";

export interface GIWeightedItem<T = any> {
  item: T;
  weight: number;
}

export class GI_RandomEngine {
  // Cryptographically strong random bytes
  bytes(length: number): Buffer {
    return crypto.randomBytes(length);
  }

  // Random integer in range [min, max]
  int(min: number, max: number): number {
    const range = max - min + 1;
    const rand = crypto.randomInt(0, range);
    return min + rand;
  }

  // Random float in range [min, max)
  float(min: number, max: number): number {
    const buf = this.bytes(4);
    const num = buf.readUInt32BE(0) / 0xffffffff;
    return min + num * (max - min);
  }

  // Boolean coin flip
  bool(): boolean {
    return this.int(0, 1) === 1;
  }

  // Pick a random element
  pick<T>(arr: T[]): T | null {
    if (arr.length === 0) return null;
    return arr[this.int(0, arr.length - 1)];
  }

  // Shuffle array (Fisher–Yates)
  shuffle<T>(arr: T[]): T[] {
    const out = [...arr];
    for (let i = out.length - 1; i > 0; i--) {
      const j = this.int(0, i);
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  // Weighted random selection
  weighted<T>(items: GIWeightedItem<T>[]): T | null {
    if (items.length === 0) return null;

    const total = items.reduce((sum, i) => sum + i.weight, 0);
    let r = this.float(0, total);

    for (const entry of items) {
      if (r < entry.weight) return entry.item;
      r -= entry.weight;
    }

    return items[items.length - 1].item;
  }

  // Gaussian / normal distribution (Box–Muller)
  gaussian(mean = 0, stddev = 1): number {
    const u1 = 1 - Math.random();
    const u2 = 1 - Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return z * stddev + mean;
  }

  // Noise (simple 1D)
  noise(seed: number, x: number): number {
    const n = Math.sin(seed * 9999 + x * 0.12345) * 43758.5453;
    return n - Math.floor(n);
  }
}

export function createGIRandomEngine() {
  return new GI_RandomEngine();
}

