export function capitalize(str = "") {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function camelCase(str = "") {
  return str
    .toLowerCase()
    .replace(/[-_ ]+([a-z])/g, (_, c) => c.toUpperCase());
}

export function snakeCase(str = "") {
  return str
    .replace(/([A-Z])/g, "_$1")
    .replace(/[- ]+/g, "_")
    .toLowerCase();
}
