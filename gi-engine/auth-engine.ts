import crypto from "crypto";
import { GI_CryptoEngine, createGICryptoEngine } from "./crypto-engine";

export type GIRole = "guest" | "user" | "creator" | "admin" | "root";

export interface GIUserIdentity {
  id: string;
  handle: string;
  roles: GIRole[];
  createdAt: number;
  meta?: Record<string, any>;
}

export interface GIAuthTokenPayload {
  sub: string;
  roles: GIRole[];
  iat: number;
  exp: number;
  meta?: Record<string, any>;
}

export interface GIAuthConfig {
  secret: string;
  tokenTTL?: number;
}

export class GI_AuthEngine {
  private crypto: GI_CryptoEngine;
  private secret: string;
  private tokenTTL: number;

  constructor(config: GIAuthConfig) {
    this.crypto = createGICryptoEngine();
    this.secret = config.secret;
    this.tokenTTL = config.tokenTTL ?? 1000 * 60 * 60; // 1h
  }

  issueToken(identity: GIUserIdentity): string {
    const payload: GIAuthTokenPayload = {
      sub: identity.id,
      roles: identity.roles,
      iat: Date.now(),
      exp: Date.now() + this.tokenTTL,
      meta: identity.meta || {}
    };

    const json = JSON.stringify(payload);
    const sig = this.crypto.hmacSHA256(this.secret, json);
    const token = Buffer.from(json, "utf8").toString("base64url") + "." + sig;
    return token;
  }

  verifyToken(token: string): GIAuthTokenPayload | null {
    const [b64, sig] = token.split(".");
    if (!b64 || !sig) return null;

    const json = Buffer.from(b64, "base64url").toString("utf8");
    const expected = this.crypto.hmacSHA256(this.secret, json);
    if (expected !== sig) return null;

    let payload: GIAuthTokenPayload;
    try {
      payload = JSON.parse(json);
    } catch {
      return null;
    }

    if (payload.exp && payload.exp < Date.now()) return null;
    return payload;
  }

  hasRole(payload: GIAuthTokenPayload | null, role: GIRole): boolean {
    if (!payload) return false;
    return payload.roles.includes(role);
  }

  hasAnyRole(payload: GIAuthTokenPayload | null, roles: GIRole[]): boolean {
    if (!payload) return false;
    return roles.some(r => payload.roles.includes(r));
  }
}

export function createGIAuthEngine(config: GIAuthConfig) {
  return new GI_AuthEngine(config);
}
