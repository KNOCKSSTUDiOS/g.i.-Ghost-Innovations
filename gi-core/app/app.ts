import { AdvancedRouter } from "../router/router";
import { MiddlewareStack } from "../middleware/stack";
import { HttpServer } from "../http/server";
import { HttpContext } from "../http/context";

export class App {
  private router = new AdvancedRouter();
  private middleware = new MiddlewareStack();
  private server: HttpServer | null = null;

  use(mw: (ctx: HttpContext, next: () => Promise<void>) => Promise<void> | void) {
    this.middleware.use(mw);
  }

  route(method: string, path: string, handler: Function, middlewares: Function[] = []) {
    this.router.register({
      method,
      path,
      handler,
      middlewares
    });
  }

  start(port: number) {
    this.server = new HttpServer({
      handle: async (ctx: HttpContext) => {
        await this.middleware.run(ctx, async () => {
          await this.router.handle(ctx);
        });
      }
    } as any);

    this.server.start(port);
  }
}

