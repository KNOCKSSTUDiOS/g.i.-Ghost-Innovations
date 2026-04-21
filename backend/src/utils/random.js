export function randomInt(min = 0, max = 100) {
  const mn = Math.ceil(min);
  const mx = Math.floor(max);
  return Math.floor(Math.random() * (mx - mn + 1)) + mn;
}

export function randomFloat(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
}

export function pick(list = []) {
  if (!Array.isArray(list) || list.length === 0) return null;
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}
