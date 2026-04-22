export class EngineError extends Error {
  code: string;
  details: any;

  constructor(code: string, message: string, details: any = null) {
    super(message);
    this.code = code;
    this.details = details;
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      details: this.details
    };
  }
}
