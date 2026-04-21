import { GI } from "../gi-engine";
import type { GI_Router } from "./gi-router";
import { createGIAdminAuth } from "../gi-engine/admin-auth";

export function registerGISystemRoutes(router: GI_Router) {
  const engine = GI();
  const admin = createGIAdminAuth();

  // Helper to wrap handlers with admin protection
  function protect(requiredRank, handler) {
    return async (req, res) => {
      const authHeader = req.headers["authorization"];
      if (!authHeader) {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Missing authorization header" }));
        return;
      }

      const token = authHeader.replace("Bearer ", "").trim();
      const payload = admin.verifyToken(token);

      if (!payload) {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid admin token" }));
        return;
      }

      if (!admin.hasRank(payload.rank, requiredRank)) {
        res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Insufficient rank" }));
        return;
      }

      await handler(req, res, engine, payload);
    };
  }

  // --------------------------------------
  // ENGINE INFO
  // --------------------------------------
  router.register(
    "GET",
    "/gi/system/info",
    protect("viewer", async (req, res, engine) => {
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
    })
  );

  // --------------------------------------
  // LOGS
  // --------------------------------------
  router.register(
    "GET",
    "/gi/system/logs",
    protect("moderator", async (req, res, engine) => {
      const logs = engine.logger.getHistory();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(logs));
    })
  );

  // --------------------------------------
  // TASKS
  // --------------------------------------
  router.register(
    "GET",
    "/gi/system/tasks",
    protect("developer", async (req, res, engine) => {
      const tasks = engine.tasks.all();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(tasks));
    })
  );

  // --------------------------------------
  // PIPELINES
  // --------------------------------------
  router.register(
    "GET",
    "/gi/system/pipelines",
    protect("developer", async (req, res, engine) => {
      const list = engine.pipeline.list();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(list));
    })
  );

  // --------------------------------------
  // EVENTS
  // --------------------------------------
  router.register(
    "GET",
    "/gi/system/events",
    protect("developer", async (req, res, engine) => {
      const events = engine.events.getHistory();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(events));
    })
  );

  // --------------------------------------
  // STORAGE LISTING
  // --------------------------------------
  router.register(
    "GET",
    "/gi/system/storage",
    protect("admin", async (req, res, engine) => {
      const list = engine.storage.list(".");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(list));
    })
  );

  // --------------------------------------
  // CONFIG DUMP
  // --------------------------------------
  router.register(
    "GET",
    "/gi/system/config",
    protect("owner", async (req, res, engine) => {
      const cfg = engine.config.all();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(cfg));
    })
  );
}
