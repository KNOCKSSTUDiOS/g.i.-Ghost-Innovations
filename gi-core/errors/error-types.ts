export class CoreError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

export const ERROR_CODES = {
  invalid_request: "invalid_request",
  not_found: "not_found",
  unauthorized: "unauthorized",
  forbidden: "forbidden",
  conflict: "conflict",
  internal: "internal"
};

