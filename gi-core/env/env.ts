export class Env {
  get(key: string, fallback: string | null = null): string | null {
    const value = process.env[key];
    return value !== undefined ? value : fallback;
  }

  getNumber(key: string, fallback: number | null = null): number | null {
    const value = process.env[key];
    if (value === undefined) return fallback;
    const num = Number(value);
    return isNaN(num) ? fallback : num;
  }

  getBool(key: string, fallback: boolean | null = null): boolean | null {
    const value = process.env[key];
    if (value === undefined) return fallback;
    const normalized = value.toLowerCase();
    if (normalized === "true") return true;
    if (normalized === "false") return false;
    return fallback;
  }

  require(key: string): string {
    const value = process.env[key];
    if (value === undefined) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
  }
}
