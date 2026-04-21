import crypto from "crypto";

export function generateToken(length = 32) {
  return crypto.randomBytes(length).toString("hex");
}

export function verifyToken(token = "", expected = "") {
  if (!token || !expected) return false;
  return crypto.timingSafeEqual(
    Buffer.from(token),
    Buffer.from(expected)
  );
}

