export function ok(data = {}, meta = {}) {
  return {
    success: true,
    data,
    meta
  };
}

export function fail(message = "Error", status = 500, meta = {}) {
  return {
    success: false,
    error: {
    message,
    status,
    meta
    }
  };
}
