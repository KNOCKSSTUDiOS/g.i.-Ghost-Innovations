import { Core } from "../gi-core/core";
import { Router } from "../gi-router/router";

export function registerSystemExtension(router: Router, core: Core) {
  router.register("GET", "/system/status", async (req, res) => {
    const data = {
      time: Date.now(),
      uptime: process.uptime(),
      memory: process.memoryUsage()
    };

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  });

  router.register("POST", "/system/clear-cache", async (req, res) => {
    core.storage.clear();
    core.logger.clear();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "cleared" }));
  });

  router.register("GET", "/system/events", async (req, res) => {
    const list = core.events ? "available" : "unavailable";

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ events: list }));
  });
}

