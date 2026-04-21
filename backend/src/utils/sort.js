export function asc(field = "") {
  return (a, b) => {
    if (a[field] < b[field]) return -1;
    if (a[field] > b[field]) return 1;
    return 0;
  };
}

export function desc(field = "") {
  return (a, b) => {
    if (a[field] > b[field]) return -1;
    if (a[field] < b[field]) return 1;
    return 0;
  };
}
