import path from "path";

export function join(...args) {
  return path.join(...args);
}

export function resolve(...args) {
  return path.resolve(...args);
}

export function filename(p = "") {
  return path.basename(p);
}
