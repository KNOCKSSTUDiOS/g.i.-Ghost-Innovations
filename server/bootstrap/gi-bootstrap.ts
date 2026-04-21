import { GI } from "../gi-engine";
import type { GICoreEngine } from "../gi-engine";

let engine: GICoreEngine | null = null;

export function bootstrapGI(): GICoreEngine {
  if (engine) return engine;

  // Initialize unified engine
  engine = GI();

  // Start background systems
  engine.logger.info("GI Engine bootstrapping...");
  engine.tasks.start();

  // Emit startup event
  engine.events.emit("gi:startup", {
    timestamp: Date.now(),
    message: "GI Engine initialized"
  });

  engine.logger.info("GI Engine ready.");

  return engine;
}

