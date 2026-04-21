export function unique(list = []) {
  return Array.from(new Set(list));
}

export function chunk(list = [], size = 1) {
  if (!Array.isArray(list) || size < 1) return [];
  const result = [];
  for (let i = 0; i < list.length; i += size) {
    result.push(list.slice(i, i + size));
  }
  return result;
}

export function flatten(list = []) {
  return list.reduce((acc, val) => acc.concat(val), []);
}
