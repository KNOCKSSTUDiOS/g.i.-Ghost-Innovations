export function clamp(value, min = 0, max = 1) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

export function sum(list = []) {
  if (!Array.isArray(list)) return 0;
  return list.reduce((acc, n) => acc + (Number(n) || 0), 0);
}

export function average(list = []) {
  if (!Array.isArray(list) || list.length === 0) return 0;
  return sum(list) / list.length;
}
