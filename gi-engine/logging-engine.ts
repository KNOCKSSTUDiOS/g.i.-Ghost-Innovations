import fs from "fs";
import path from "path";

export type GILogLevel = "debug" | "info" | "warn" | "error";

export interface GILogEntry {
  level: GILogLevel;
  message: string;
  timestamp: string;
  meta?: any;
}

export interface GILogConfig {
  dir?: string;
  file?: string;
  rotateSize?: number;
  level?: GILogLevel;
}

export class GI_LoggingEngine {
  dir: string;
  file: string;
  rotateSize: number;
  level: GILogLevel;

  constructor(config: GILogConfig = {}) {
    this.dir = config.dir || path.join(process.cwd(), "logs");
    this.file = config.file || "gi.log";
    this.rotateSize = config.rotateSize || 1024 * 1024 * 5; // 5MB
    this.level = config.level || "info";

    if (!fs.existsSync(this.dir)) {
      fs.mkdirSync(this.dir, { recursive: true });
    }
  }

  getFilePath() {
    return path.join(this.dir, this.file);
  }

  shouldRotate() {
    try {
      const stats = fs.statSync(this.getFilePath());
      return stats.size >= this.rotateSize;
    } catch {
      return false;
    }
  }

  rotate() {
    const oldPath = this.getFilePath();
    const newPath = path.join(
      this.dir,
      `${Date.now()}-${this.file}`
    );

    try {
      fs.renameSync(oldPath, newPath);
    } catch {}
  }

  write(level: GILogLevel, message: string | any, meta: any = null) {
    const allowed = ["debug", "info", "warn", "error"];
    if (!allowed.includes(level)) return;

    const entry: GILogEntry = {
      level,
      message: typeof message === "string" ? message : JSON.stringify(message),
      timestamp: new Date().toISOString(),
      meta
    };

    if (this.shouldRotate()) {
      this.rotate();
    }

    const line = JSON.stringify(entry) + "\n";
    fs.appendFileSync(this.getFilePath(), line);
  }

  debug(msg: any, meta?: any) {
    if (this.level === "debug") this.write("debug", msg, meta);
  }

  info(msg: any, meta?: any) {
    if (["debug", "info"].includes(this.level)) this.write("info", msg, meta);
  }

  warn(msg: any, meta?: any) {
    if (["debug", "info", "warn"].includes(this.level)) this.write("warn", msg, meta);
  }

  error(msg: any, meta?: any) {
    this.write("error", msg, meta);
  }
}

export function createGILoggingEngine(config: GILogConfig = {}) {
  return new GI_LoggingEngine(config);
}

