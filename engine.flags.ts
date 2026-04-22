export class EngineFlags {
  private flags: Record<string, boolean>;

  constructor(initial: Record<string, boolean> = {}) {
    this.flags = { ...initial };
  }

  enable(name: string) {
    this.flags[name] = true;
  }

  disable(name: string) {
    this.flags[name] = false;
  }

  isEnabled(name: string) {
    return this.flags[name] === true;
  }

  all() {
    return { ...this.flags };
  }
}

