export function sendJSON(res, status = 200, data = {}) {
  res.status(status).json({
    status,
    data
  });
}

export function sendError(res, error) {
  const status = error.status || 500;
  res.status(status).json({
    status,
    error: error.message || "Server Error",
    meta: error.meta || {}
  });
}
