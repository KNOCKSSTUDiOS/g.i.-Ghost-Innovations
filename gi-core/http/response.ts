export class HttpResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: any;

  constructor() {
    this.statusCode = 200;
    this.headers = {};
    this.body = null;
  }

  status(code: number) {
    this.statusCode = code;
    return this;
  }

  setHeader(name: string, value: string) {
    this.headers[name] = value;
    return this;
  }

  json(data: any) {
    this.setHeader("content-type", "application/json");
    this.body = JSON.stringify(data);
    return this;
  }

  text(data: string) {
    this.setHeader("content-type", "text/plain");
    this.body = data;
    return this;
  }
}

