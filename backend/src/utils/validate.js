export function isEmail(str = "") {
  if (typeof str !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str.trim());
}

export function isString(v) {
  return typeof v === "string";
}

export function isNumber(v) {
  return typeof v === "number" && !isNaN(v);
}

