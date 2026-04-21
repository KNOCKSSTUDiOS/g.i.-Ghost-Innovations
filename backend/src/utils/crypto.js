import crypto from "crypto";

export function hash(str = "", algorithm = "sha256") {
  return crypto.createHash(algorithm).update(str).digest("hex");
}

export function compareHash(str = "", hashed = "", algorithm = "sha256") {
  const h = crypto.createHash(algorithm).update(str).digest("hex");
  return h === hashed;
}

export function randomHex(length = 32) {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
}
