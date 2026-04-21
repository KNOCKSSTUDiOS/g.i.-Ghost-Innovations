export class Config {
  private data: Record<string, any>;

  constructor() {
    this.data = {};
  }

  get(key: string) {
    return this.data[key];
  }

  set(key: string, value: any) {
    this.data[key] = value;
  }

  load(values: Record<string, any>) {
    for (const key in values) {
      this.data[key] = values[key];
    }
  }

  reload() {
    // placeholder for future dynamic reload logic
    return true;
  }
}

