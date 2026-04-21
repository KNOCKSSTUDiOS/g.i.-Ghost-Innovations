import crypto from "crypto";

export function hash(str = "") {
  return crypto.createHash("sha256").update(str).digest("hex");
}

export function compare(str = "", hashed = "") {
  return hash(str) === hashed;
}

export function randomToken(length = 32) {
  return crypto.randomBytes(length).toString("hex");
}
