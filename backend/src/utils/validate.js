export function isString(v) {
  return typeof v === "string";
}

export function isNumber(v) {
  return typeof v === "number" && !isNaN(v);
}

export function isEmail(v = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
