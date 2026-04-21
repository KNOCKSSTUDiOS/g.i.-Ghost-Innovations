export function clamp(value, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

export function lerp(a = 0, b = 1, t = 0.5) {
  return a + (b - a) * t;
}

export function roundTo(value = 0, decimals = 0) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
