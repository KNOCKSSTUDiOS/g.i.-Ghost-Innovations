import crypto from "crypto";

export type GIErrorSeverity = "low" | "medium" | "high" | "critical";

export interface GIErrorContext {
  code?: string;
  details?: any;
  cause?: Error;
}

export interface GIErrorRecord {
  id: string;
  name: string;
  message: string;
  severity: GIErrorSeverity;
  context?: GIErrorContext;
  stack?: string;
  createdAt: number;
}

export type GIErrorHandler = (err: GIErrorRecord) => void;

export class GI_ErrorEngine {
  private handlers: GIErrorHandler[] = [];
  private history: GIErrorRecord[] = [];
  private maxHistory: number;

  constructor(maxHistory: number = 200) {
    this.maxHistory = maxHistory;
  }

  create(
    name: string,
    message: string,
    severity: GIErrorSeverity = "medium",
    context?: GIErrorContext
  ): GIErrorRecord {
    const err: GIErrorRecord = {
      id: crypto.randomUUID(),
      name,
      message,
      severity,
      context,
      stack: context?.cause?.stack,
      createdAt: Date.now()
    };

    this.history.push(err);
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }

    this.emit(err);
    return err;
  }

  on(handler: GIErrorHandler) {
    this.handlers.push(handler);
  }

  off(handler: GIErrorHandler) {
    this.handlers = this.handlers.filter(h => h !== handler);
  }

  private emit(err: GIErrorRecord) {
    for (const h of this.handlers) {
      try {
        h(err);
      } catch {
        // error handlers must never break the engine
      }
    }
  }

  getHistory() {
    return [...this.history];
  }

  clearHistory() {
    this.history = [];
  }
}

export function createGIErrorEngine(maxHistory?: number) {
  return new GI_ErrorEngine(maxHistory);
}
