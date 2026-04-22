import { Platform } from "../gi-platform/platform";
import { RouteDefinition } from "./types";

export class App {
  private platform: Platform;

  constructor(platform: Platform) {
    this.platform = platform;
  }

  registerRoutes(routes: RouteDefinition[]) {
    for (const r of routes) {
      this.platform.register(r.method, r.path, r.handler);
    }
  }

  start(port: number) {
    this.platform.start(port);
  }

