export function now() {
  return new Date();
}

export function toISO(date = new Date()) {
  return date.toISOString();
}

export function fromISO(str = "") {
  const d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
}
