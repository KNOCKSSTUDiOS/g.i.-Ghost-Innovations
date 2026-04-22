import { engineConfig } from "./engine.config";
import { EngineFlags } from "./engine.flags";
import { EngineState } from "./engine.state";
import { EngineLifecycle } from "./engine.lifecycle";
import { selectMode } from "./engine.modes";

export class EngineLoader {
  config = engineConfig;
  flags = new EngineFlags(engineConfig.flags || {});
  state = new EngineState();
  lifecycle = new EngineLifecycle();

  constructor() {
    this.config.mode = selectMode(process.env.MODE);
  }

  async init() {
    await this.lifecycle.runInit();
  }

  async ready() {
    await this.lifecycle.runReady();
  }

  async shutdown() {
    await this.lifecycle.runShutdown();
  }
}

