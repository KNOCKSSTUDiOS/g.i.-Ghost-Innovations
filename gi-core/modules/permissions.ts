export class Permissions {
  private list: Set<string>;

  constructor() {
    this.list = new Set();
  }

  add(permission: string) {
    this.list.add(permission);
  }

  remove(permission: string) {
    this.list.delete(permission);
  }

  has(permission: string) {
    return this.list.has(permission);
  }

  all() {
    return Array.from(this.list);
  }

  clear() {
    this.list.clear();
  }
}

