export function required(value, field = "field") {
  if (value === undefined || value === null || value === "") {
    return `${field} is required`;
  }
  return null;
}

export function string(value, field = "field") {
  if (typeof value !== "string") {
    return `${field} must be a string`;
  }
  return null;
}

export function number(value, field = "field") {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return `${field} must be a number`;
  }
  return null;
}

export function boolean(value, field = "field") {
  if (typeof value !== "boolean") {
    return `${field} must be a boolean`;
  }
  return null;
}
