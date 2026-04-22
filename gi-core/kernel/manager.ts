import { Lifecycle } from "./lifecycle";

export class LifecycleManager {
  private items: Lifecycle[] = [];
  private initialized = false;
  private booted = false;

  register(item: Lifecycle) {
    if (this.initialized || this.booted) return;
    this.items.push(item);
  }

  async init() {
    if (this.initialized) return;
    this.initialized = true;

    for (const item of this.items) {
      if (typeof item.init === "function") {
        await item.init();
      }
    }
  }

  async boot() {
    if (this.booted) return;
    this.booted = true;

    for (const item of this.items) {
      if (typeof item.boot === "function") {
        await item.boot();
      }
    }
  }

  async shutdown() {
    for (const item of this.items) {
      if (typeof item.shutdown === "function") {
        await item.shutdown();
      }
    }
  }
}

