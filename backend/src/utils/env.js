export function env(key, fallback = null) {
  return process.env[key] ?? fallback;
}

export function requireEnv(key) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export function bool(key, fallback = false) {
  const value = process.env[key];
  if (value === undefined) return fallback;
  return value === "true" || value === "1";
}

export function number(key, fallback = 0) {
  const value = process.env[key];
  if (value === undefined) return fallback;
  const n = Number(value);
  return isNaN(n) ? fallback : n;
}

