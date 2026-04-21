export function getEnv(key, fallback = null) {
  const v = process.env[key];
  return v !== undefined ? v : fallback;
}

export function requireEnv(key) {
  const v = process.env[key];
  if (v === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return v;
}
