export class AppError extends Error {
  constructor(message = "Application Error", status = 500, meta = {}) {
    super(message);
    this.status = status;
    this.meta = meta;
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not Found", meta = {}) {
    super(message, 404, meta);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad Request", meta = {}) {
    super(message, 400, meta);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized", meta = {}) {
    super(message, 401, meta);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden", meta = {}) {
    super(message, 403, meta);
  }
}
