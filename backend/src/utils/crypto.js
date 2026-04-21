import crypto from "crypto";

export function sha256(input = "") {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export function sha1(input = "") {
  return crypto.createHash("sha1").update(input).digest("hex");
}

export function md5(input = "") {
  return crypto.createHash("md5").update(input).digest("hex");
}

export function randomBytes(size = 32) {
  return crypto.randomBytes(size).toString("hex");
}

export function secureToken(length = 48) {
  return crypto.randomBytes(length).toString("hex");
}

export function compareHash(input, hashed) {
  return sha256(input) === hashed;
}
