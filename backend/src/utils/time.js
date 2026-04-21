import crypto from "crypto";

export function id(length = 21) {
  return crypto.randomBytes(length).toString("base64url").slice(0, length);
}

export function shortID(length = 8) {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
}
