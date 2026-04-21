export function success(data = null, status = 200) {
  return {
    ok: true,
    status,
    data
  };
}

export function fail(message = "Error", status = 500, data = null) {
  return {
    ok: false,
    status,
    message,
    data
  };
}
