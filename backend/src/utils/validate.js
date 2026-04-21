export function isEmail(str = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

export function isUUID(str = "") {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
}

export function isURL(str = "") {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}
