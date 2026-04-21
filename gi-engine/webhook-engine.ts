import crypto from "crypto";
import fetch from "node-fetch";

export interface GIWebhook {
  id: string;
  url: string;
  event: string;
  secret: string;
  createdAt: number;
  active: boolean;
}

export interface GIWebhookConfig {
  file?: string;
}

import fs from "fs";
import path from "path";

export class GI_WebhookEngine {
  file: string;
  hooks: GIWebhook[];

  constructor(config: GIWebhookConfig = {}) {
    this.file = config.file || path.join(process.cwd(), "gi-webhooks.json");
    this.hooks = this.load();
  }

  load(): GIWebhook[] {
    try {
      if (!fs.existsSync(this.file)) return [];
      const raw = fs.readFileSync(this.file, "utf8");
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  save() {
    fs.writeFileSync(this.file, JSON.stringify(this.hooks, null, 2));
  }

  register(url: string, event: string) {
    const hook: GIWebhook = {
      id: crypto.randomUUID(),
      url,
      event,
      secret: crypto.randomBytes(16).toString("hex"),
      createdAt: Date.now(),
      active: true
    };

    this.hooks.push(hook);
    this.save();
    return hook;
  }

  list(event?: string) {
    if (!event) return this.hooks;
    return this.hooks.filter(h => h.event === event && h.active);
  }

  remove(id: string) {
    this.hooks = this.hooks.filter(h => h.id !== id);
    this.save();
  }

  async trigger(event: string, payload: any) {
    const hooks = this.list(event);
    const results = [];

    for (const hook of hooks) {
      try {
        const signature = crypto
          .createHmac("sha256", hook.secret)
          .update(JSON.stringify(payload))
          .digest("hex");

        const res = await fetch(hook.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-GI-Event": event,
            "X-GI-Signature": signature
          },
          body: JSON.stringify(payload)
        });

        results.push({
          id: hook.id,
          ok: res.ok,
          status: res.status
        });
      } catch (err: any) {
        results.push({
          id: hook.id,
          ok: false,
          error: err?.message || "Unknown error"
        });
      }
    }

    return results;
  }
}

export function createGIWebhookEngine(config: GIWebhookConfig = {}) {
  return new GI_WebhookEngine(config);
}

