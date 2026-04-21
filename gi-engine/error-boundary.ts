export class GI_ErrorBoundary {
  core: any;
  logs: any;

  constructor(core: any, logs: any) {
    this.core = core;
    this.logs = logs;
  }

  wrap(fn: Function, label: string = "unknown") {
    return async (...args: any[]) => {
      try {
        return await fn(...args);
      } catch (err: any) {
        const errorObj = {
          label,
          message: err?.message || "Unknown error",
          stack: err?.stack || null,
          timestamp: new Date().toISOString()
        };

        if (this.logs && this.logs.write) {
          this.logs.write("error", errorObj);
        }

        return {
          ok: false,
          error: errorObj.message,
          label
        };
      }
    };
  }

  attachToSubsystem(subsystem: any, name: string) {
    if (!subsystem) return;

    const methods = Object.getOwnPropertyNames(
      Object.getPrototypeOf(subsystem)
    ).filter(m => m !== "constructor");

    for (const method of methods) {
      const original = subsystem[method];
      if (typeof original === "function") {
        subsystem[method] = this.wrap(original.bind(subsystem), `${name}.${method}`);
      }
    }
  }
}

export function createErrorBoundary(engine: any) {
  const boundary = new GI_ErrorBoundary(engine.core, engine.logs);

  boundary.attachToSubsystem(engine.core, "core");
  boundary.attachToSubsystem(engine.router, "router");
  boundary.attachToSubsystem(engine.guardian, "guardian");
  boundary.attachToSubsystem(engine.shield, "shield");
  boundary.attachToSubsystem(engine.language, "language");
  boundary.attachToSubsystem(engine.sensory, "sensory");
  boundary.attachToSubsystem(engine.actions, "actions");
  boundary.attachToSubsystem(engine.access, "access");
  boundary.attachToSubsystem(engine.logs, "logs");

  return boundary;
}

