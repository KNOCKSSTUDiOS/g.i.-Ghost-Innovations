import { EngineLifecycle } from "./engine.lifecycle";

export class EngineHooks {
  private lifecycle: EngineLifecycle;

  constructor(lifecycle: EngineLifecycle) {
    this.lifecycle = lifecycle;
  }

  init(handler: () => void | Promise<void>) {
    this.lifecycle.onInit(handler);
  }

  ready(handler: () => void | Promise<void>) {
    this.lifecycle.onReady(handler);
  }

  shutdown(handler: () => void | Promise<void>) {
    this.lifecycle.onShutdown(handler);
  }
}

