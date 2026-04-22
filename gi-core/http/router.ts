import { HttpContext } from "./context";

type Handler = (ctx: HttpContext) => Promise<void> | void;

interface Route {
  method: string;
  path: string;
  handler: Handler;
}

export class HttpRouter {
  private routes: Route[] = [];

  register(method: string, path: string, handler: Handler) {
    this.routes.push({ method, path, handler });
  }

  async handle(ctx: HttpContext) {
    const { method, path } = ctx.req;

    for (const route of this.routes) {
      if (route.method === method && route.path === path) {
        await route.handler(ctx);
        return;
      }
    }

    ctx.res.status(404).text("Not Found");
  }
}

