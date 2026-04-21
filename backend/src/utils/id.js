import crypto from "crypto";

export function shortId(length = 12) {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
}

export function uuid() {
  return crypto.randomUUID();
}
