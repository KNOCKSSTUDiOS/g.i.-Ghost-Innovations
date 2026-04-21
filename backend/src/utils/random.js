export function randomInt(min = 0, max = 1) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomId(length = 16) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return out;
}

export function pick(arr = []) {
  if (!arr.length) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}
