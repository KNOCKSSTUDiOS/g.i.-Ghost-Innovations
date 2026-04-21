export async function attempt(fn, ...args) {
  try {
    const result = await fn(...args);
    return [null, result];
  } catch (err) {
    return [err, null];
  }
}

export function wrap(fn) {
  return async function (req, res, next) {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

