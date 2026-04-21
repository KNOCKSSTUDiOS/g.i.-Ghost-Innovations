import { GI } from "../gi-engine";
import type { GI_Router } from "./gi-router";

export function registerGISystemRoutes(router: GI_Router) {
  const engine = GI();

  // --------------------------------------
  // ENGINE INFO
  // --------------------------------------
  router.register("GET", "/gi/system/info", async (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        engine: "GI",
        version: "1.0.0",
        timestamp: Date.now(),
        subsystems: {
          auth: true,
          session: true,
          memory: true,
          error: true,
          cache: true,
          cachePersist: true,
          crypto: true,
          events: true,
          tasks: true,
          pipeline: true,
          storage: true,
          logger: true,
          config: true
        }
      })
    );
  });

  // --------------------------------------
  // LOGS
  // --------------------------------------
  router.register("GET", "/gi/system/logs", async (req, res) => {
    const logs = engine.logger.getHistory();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(logs));
  });

  // --------------------------------------
  // TASKS
  // --------------------------------------
  router.register("GET", "/gi/system/tasks", async (req, res) => {
    const tasks = engine.tasks.all();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(tasks));
  });

  // --------------------------------------
  // PIPELINES
  // --------------------------------------
  router.register("GET", "/gi/system/pipelines", async (req, res) => {
    const list = engine.pipeline.list();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(list));
  });

  // --------------------------------------
  // EVENTS
  // --------------------------------------
  router.register("GET", "/gi/system/events", async (req, res) => {
    const events = engine.events.getHistory();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(events));
  });

  // --------------------------------------
  // STORAGE LISTING
  // --------------------------------------
  router.register("GET", "/gi/system/storage", async (req, res) => {
    const list = engine.storage.list(".");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(list));
  });

  // --------------------------------------
  // CONFIG DUMP
  // --------------------------------------
  router.register("GET", "/gi/system/config", async (req, res) => {
    const cfg = engine.config.all();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(cfg));
  });
}

