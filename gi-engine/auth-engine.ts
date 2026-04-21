import crypto from "crypto";

export type GIRank = "guest" | "user" | "creator" | "admin" | "root";

export interface GIAuthConfig {
  secret: string;
  expiresIn?: number;
}

export class GI_AuthEngine {
  secret: string;
  expiresIn: number;

  constructor(config: GIAuthConfig) {
    this.secret = config.secret;
    this.expiresIn = config.expiresIn || 1000 * 60 * 60 * 24; // 24h
  }

  sign(payload: any) {
    const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
    const body = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + this.expiresIn })).toString("base64url");
    const signature = crypto
      .createHmac("sha256", this.secret)
      .update(`${header}.${body}`)
      .digest("base64url");

    return `${header}.${body}.${signature}`;
  }

  verify(token: string) {
    try {
      const [header, body, signature] = token.split(".");
      const check = crypto
        .createHmac("sha256", this.secret)
        .update(`${header}.${body}`)
        .digest("base64url");

      if (check !== signature) return null;

      const payload = JSON.parse(Buffer.from(body, "base64url").toString());
      if (payload.exp && payload.exp < Date.now()) return null;

      return payload;
    } catch {
      return null;
    }
  }

  rankAtLeast(userRank: GIRank, required: GIRank) {
    const order: GIRank[] = ["guest", "user", "creator", "admin", "root"];
    return order.indexOf(userRank) >= order.indexOf(required);
  }

  protect(requiredRank: GIRank) {
    return (req: any, res: any, next: Function) => {
      const token = req.headers["authorization"]?.replace("Bearer ", "");
      if (!token) return res.status(401).json({ ok: false, error: "Missing token" });

      const payload = this.verify(token);
      if (!payload) return res.status(401).json({ ok: false, error: "Invalid token" });

      if (!this.rankAtLeast(payload.rank, requiredRank)) {
        return res.status(403).json({ ok: false, error: "Insufficient rank" });
      }

      req.user = payload;
      next();
    };
  }
}

export function createGIAuthEngine(config: GIAuthConfig) {
  return new GI_AuthEngine(config);
}

