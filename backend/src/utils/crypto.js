import crypto from "crypto";

export function hash(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

export function compareHash(text, hashed) {
  return hash(text) === hashed;
}

export function uuid() {
  return crypto.randomUUID();
}

