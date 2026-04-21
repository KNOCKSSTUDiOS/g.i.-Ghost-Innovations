export class GI_EncodingEngine {
  // ---------- UTF-8 ----------
  utf8Encode(str: string): Buffer {
    return Buffer.from(str, "utf8");
  }

  utf8Decode(buf: Buffer): string {
    return buf.toString("utf8");
  }

  // ---------- BASE64 ----------
  base64Encode(data: string | Buffer): string {
    return Buffer.isBuffer(data)
      ? data.toString("base64")
      : Buffer.from(data, "utf8").toString("base64");
  }

  base64Decode(b64: string): Buffer {
    return Buffer.from(b64, "base64");
  }

  // URL-safe Base64 (no padding, no + or /)
  base64UrlEncode(data: string | Buffer): string {
    const b64 = this.base64Encode(data);
    return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  base64UrlDecode(b64url: string): Buffer {
    let b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4 !== 0) b64 += "=";
    return Buffer.from(b64, "base64");
  }

  // ---------- HEX ----------
  hexEncode(data: string | Buffer): string {
    return Buffer.isBuffer(data)
      ? data.toString("hex")
      : Buffer.from(data, "utf8").toString("hex");
  }

  hexDecode(hex: string): Buffer {
    return Buffer.from(hex, "hex");
  }

  // ---------- BINARY <-> STRING ----------
  toBinary(buf: Buffer): string {
    return [...buf].map(b => b.toString(2).padStart(8, "0")).join("");
  }

  fromBinary(bin: string): Buffer {
    const bytes = [];
    for (let i = 0; i < bin.length; i += 8) {
      bytes.push(parseInt(bin.slice(i, i + 8), 2));
    }
    return Buffer.from(bytes);
  }

  // ---------- JSON ----------
  jsonEncode(obj: any): string {
    return JSON.stringify(obj);
  }

  jsonDecode<T = any>(str: string): T {
    return JSON.parse(str);
  }

  // ---------- GENERIC ----------
  toBuffer(data: any): Buffer {
    if (Buffer.isBuffer(data)) return data;
    if (typeof data === "string") return Buffer.from(data, "utf8");
    return Buffer.from(JSON.stringify(data), "utf8");
  }
}

export function createGIEncodingEngine() {
  return new GI_EncodingEngine();
}

