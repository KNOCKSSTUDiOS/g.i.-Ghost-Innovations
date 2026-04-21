type EventHandler = (...args: any[]) => void;

export class Events {
  private listeners: Map<string, EventHandler[]>;

  constructor() {
    this.listeners = new Map();
  }

  on(event: string, handler: EventHandler) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(handler);
  }

  off(event: string, handler: EventHandler) {
    const list = this.listeners.get(event);
    if (!list) return;

    this.listeners.set(
      event,
      list.filter(h => h !== handler)
    );
  }

  emit(event: string, ...args: any[]) {
    const list = this.listeners.get(event);
    if (!list) return;

    for (const handler of list) {
      handler(...args);
    }
  }

  clear(event?: string) {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }
}

