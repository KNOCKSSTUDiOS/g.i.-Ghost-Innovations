import { GI } from "./index";

export interface GIUserRecord {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: number;
  updatedAt: number;
  profile: Record<string, any>;
}

export class GI_UserEngine {
  private engine = GI();
  private file = "users.json";
  private users: Record<string, GIUserRecord> = {};

  constructor() {
    this.load();
  }

  // --------------------------------------
  // LOAD USERS FROM STORAGE
  // --------------------------------------
  private load() {
    try {
      if (this.engine.storage.exists(this.file)) {
        this.users = this.engine.storage.readJSON(this.file);
      }
    } catch {
      this.users = {};
    }
  }

  // --------------------------------------
  // SAVE USERS TO STORAGE
  // --------------------------------------
  private save() {
    this.engine.storage.writeJSON(this.file, this.users, true);
  }

  // --------------------------------------
  // CREATE USER
  // --------------------------------------
  async create(email: string, password: string, profile: any = {}) {
    const id = this.engine.crypto.uuid();
    const passwordHash = await this.engine.crypto.hash(password);

    const user: GIUserRecord = {
      id,
      email: email.toLowerCase(),
      passwordHash,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      profile
    };

    this.users[id] = user;
    this.save();

    return user;
  }

  // --------------------------------------
  // VERIFY PASSWORD
  // --------------------------------------
  async verifyPassword(user: GIUserRecord, password: string) {
    return this.engine.crypto.compare(password, user.passwordHash);
  }

  // --------------------------------------
  // FIND USER BY EMAIL
  // --------------------------------------
  findByEmail(email: string): GIUserRecord | null {
    const target = email.toLowerCase();
    for (const id of Object.keys(this.users)) {
      if (this.users[id].email === target) return this.users[id];
    }
    return null;
  }

  // --------------------------------------
  // FIND USER BY ID
  // --------------------------------------
  findById(id: string): GIUserRecord | null {
    return this.users[id] || null;
  }

  // --------------------------------------
  // UPDATE USER PROFILE
  // --------------------------------------
  updateProfile(id: string, profile: any) {
    const user = this.users[id];
    if (!user) return null;

    user.profile = { ...user.profile, ...profile };
    user.updatedAt = Date.now();

    this.save();
    return user;
  }

  // --------------------------------------
  // CHANGE PASSWORD
  // --------------------------------------
  async changePassword(id: string, newPassword: string) {
    const user = this.users[id];
    if (!user) return null;

    user.passwordHash = await this.engine.crypto.hash(newPassword);
    user.updatedAt = Date.now();

    this.save();
    return user;
  }

  // --------------------------------------
  // DELETE USER
  // --------------------------------------
  delete(id: string) {
    if (!this.users[id]) return false;
    delete this.users[id];
    this.save();
    return true;
  }

  // --------------------------------------
  // LIST USERS (ADMIN ONLY)
  // --------------------------------------
  list() {
    return Object.values(this.users);
  }
}

export function createGIUserEngine() {
  return new GI_UserEngine();
}

