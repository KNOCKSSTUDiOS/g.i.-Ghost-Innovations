export function now() {
  return Date.now();
}

export function iso() {
  return new Date().toISOString();
}

export function format(ts) {
  return new Date(ts).toLocaleString();
}
