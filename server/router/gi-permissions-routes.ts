import { GI } from "../gi-engine";
import type { GI_Router } from "./gi-router";
import { createGIAdminAuth } from "../gi-engine/admin-auth";

export function registerGIPermissionsRoutes(router: GI_Router) {
  const engine = GI();
  const admin = createGIAdminAuth();

  // Utility: read JSON body
  async function readJSON(req) {
    return new Promise(resolve => {
      let body = "";
      req.on("data", chunk => (body += chunk));
      req.on("end", () => {
        try {
          resolve(body ? JSON.parse(body) : {});
        } catch {
          resolve({});
        }
      });
    });
  }

  // Helper: protect route with rank
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
  // CREATE PERMISSION
  // --------------------------------------
  router.register(
    "POST",
    "/gi/permissions/create",
    protect("admin", async (req, res, engine) => {
      const data = await readJSON(req);
      const { name, description } = data;

      if (!name || !description) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Missing name or description" }));
        return;
      }

      const perm = engine.permissions.createPermission(name, description);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ permission: perm }));
    })
  );

  // --------------------------------------
  // ASSIGN PERMISSION
  // --------------------------------------
  router.register(
    "POST",
    "/gi/permissions/assign",
    protect("admin", async (req, res, engine) => {
      const data = await readJSON(req);
      const { userId, permissionId } = data;

      if (!userId || !permissionId) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Missing userId or permissionId" }));
        return;
      }

      const ok = engine.permissions.assignPermission(userId, permissionId);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: ok }));
    })
  );

  // --------------------------------------
  // REMOVE PERMISSION
  // --------------------------------------
  router.register(
    "POST",
    "/gi/permissions/remove",
    protect("admin", async (req, res, engine) => {
      const data = await readJSON(req);
      const { userId, permissionId } = data;

      if (!userId || !permissionId) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Missing userId or permissionId" }));
        return;
      }

      const ok = engine.permissions.removePermission(userId, permissionId);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: ok }));
    })
  );

  // --------------------------------------
  // LIST PERMISSIONS
  // --------------------------------------
  router.register(
    "GET",
    "/gi/permissions/list",
    protect("developer", async (req, res, engine) => {
      const list = engine.permissions.listPermissions();

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(list));
    })
  );

  // --------------------------------------
  // LIST USER PERMISSIONS
  // --------------------------------------
  router.register(
    "GET",
    "/gi/permissions/user",
    protect("developer", async (req, res, engine) => {
      const url = new URL(req.url, "http://localhost");
      const userId = url.searchParams.get("id");

      if (!userId) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Missing userId" }));
        return;
      }

      const list = engine.permissions.listUserPermissions(userId);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(list));
    })
  );
}

