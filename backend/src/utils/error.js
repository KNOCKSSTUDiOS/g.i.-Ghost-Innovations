export function createError(message = "Unknown error", status = 500) {
  const err = new Error(message);
  err.status = status;
  return err;
}

export function throwError(message = "Unknown error", status = 500) {
  const err = new Error(message);
  err.status = status;
  throw err;
}

export function toJSON(err = {}) {
  return {
    message: err.message || "Unknown error",
    status: err.status || 500,
    stack: err.stack || null
  };
}
