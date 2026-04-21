import crypto from "crypto";

export interface GIKeyPair {
  publicKey: string;
  privateKey: string;
}

export class GI_CryptoEngine {
  // ---------- HASHING ----------
  hashSHA256(data: string | Buffer): string {
    return crypto.createHash("sha256").update(data).digest("hex");
  }

  hashSHA512(data: string | Buffer): string {
    return crypto.createHash("sha512").update(data).digest("hex");
  }

  hashMD5(data: string | Buffer): string {
    return crypto.createHash("md5").update(data).digest("hex");
  }

  // ---------- HMAC ----------
  hmacSHA256(secret: string, data: string | Buffer): string {
    return crypto.createHmac("sha256", secret).update(data).digest("hex");
  }

  hmacSHA512(secret: string, data: string | Buffer): string {
    return crypto.createHmac("sha512", secret).update(data).digest("hex");
  }

  // ---------- KEY GENERATION ----------
  generateKeyPair(): GIKeyPair {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem" }
    });

    return { publicKey, privateKey };
  }

  // ---------- SIGNING ----------
  sign(privateKey: string, data: string | Buffer): string {
    const signer = crypto.createSign("RSA-SHA256");
    signer.update(data);
    signer.end();
    return signer.sign(privateKey, "base64");
  }

  verify(publicKey: string, data: string | Buffer, signature: string): boolean {
    const verifier = crypto.createVerify("RSA-SHA256");
    verifier.update(data);
    verifier.end();
    return verifier.verify(publicKey, signature, "base64");
  }

  // ---------- SYMMETRIC ENCRYPTION (AES-256-GCM) ----------
  encryptAES(key: Buffer, plaintext: string): { iv: Buffer; tag: Buffer; ciphertext: Buffer } {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

    const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
    const tag = cipher.getAuthTag();

    return { iv, tag, ciphertext };
  }

  decryptAES(key: Buffer, iv: Buffer, tag: Buffer, ciphertext: Buffer): string {
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(tag);

    const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    return plaintext.toString("utf8");
  }

  // ---------- RANDOM KEYS ----------
  randomKey(bytes: number = 32): Buffer {
    return crypto.randomBytes(bytes);
  }

  // ---------- BASE64 ----------
  toBase64(data: Buffer | string): string {
    return Buffer.isBuffer(data) ? data.toString("base64") : Buffer.from(data).toString("base64");
  }

  fromBase64(b64: string): Buffer {
    return Buffer.from(b64, "base64");
  }
}

export function createGICryptoEngine() {
  return new GI_CryptoEngine();
}

