export function getEnv(key = "", fallback = null) {
  return process.env[key] ?? fallback;
}

export function requireEnv(key = "") {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export function bool(key = "", fallback = false) {
  const v = process.env[key];
  if (v === undefined) return fallback;
  return v === "1" || v.toLowerCase() === "true";
}
