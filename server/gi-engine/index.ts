import { createGICoreEngine, GICoreEngine } from "./core-engine";

let engine: GICoreEngine | null = null;

export function GI(): GICoreEngine {
  if (!engine) {
    engine = createGICoreEngine();
  }
  return engine;
}

export type { GICoreEngine } from "./core-engine";

