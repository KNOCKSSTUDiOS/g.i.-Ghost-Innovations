export function int(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function float(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
}

export function choice(list = []) {
  if (!Array.isArray(list) || list.length === 0) return null;
  const idx = Math.floor(Math.random() * list.length);
  return list[idx];
}
