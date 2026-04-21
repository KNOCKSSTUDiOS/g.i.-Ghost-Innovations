import type { GI_Router } from "./gi-router";
import { GI } from "../gi-engine";

export function registerGIAccessExampleRoutes(router: GI_Router) {
  const engine = GI();

  // --------------------------------------
  // ADMIN‑RANK PROTECTED ROUTE
  // requireRank: "admin"
  // --------------------------------------
  router.register(
    "GET",
    "/example/admin-only",
    engine.access.protect({ requireRank: "admin" }, async (req, res, engine, ctx) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          ok: true,
          message: "Admin‑rank access granted",
          admin: ctx.admin
        })
      );
    })
  );

  // --------------------------------------
  // PERMISSION‑PROTECTED ROUTE
  // requirePermission: "view_dashboard"
  // --------------------------------------
  router.register(
    "GET",
    "/example/permission-dashboard",
    engine.access.protect({ requirePermission: "view_dashboard" }, async (req, res, engine) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          ok: true,
          message: "Permission 'view_dashboard' granted"
        })
      );
    })
  );

  // --------------------------------------
  // ROLE‑BASED EFFECTIVE PERMISSION ROUTE
  // (roles → permissions → access)
  // --------------------------------------
  router.register(
    "GET",
    "/example/role-effective",
    engine.access.protect({ requirePermission: "creator_tools_access" }, async (req, res, engine) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          ok: true,
          message: "Effective permission 'creator_tools_access' granted"
        })
      );
    })
  );

  // --------------------------------------
  // MIXED ADMIN + PERMISSION ROUTE
  // Admin rank OR permission can pass
  // --------------------------------------
  router.register(
    "GET",
    "/example/mixed-access",
    async (req, res) => {
      // First try admin rank
      const adminCheck = await engine.access.check({
        req,
        requireRank: "developer"
      });

      if (adminCheck.ok) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            ok: true,
            message: "Developer‑rank admin access granted"
          })
        );
        return;
      }

      // Fallback to permission
      let userId = null;
      try {
        const token = req.headers["authorization"]?.replace("Bearer ", "").trim();
        const decoded = engine.auth.verify(token);
        userId = decoded.uid;
      } catch {}

      const permCheck = await engine.access.check({
        userId,
        requirePermission: "mixed_access"
      });

      if (!permCheck.ok) {
        res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Access denied" }));
        return;
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          ok: true,
          message: "Permission 'mixed_access' granted"
        })
      );
    }
  );

  // --------------------------------------
  // OPEN ROUTE WITH OPTIONAL USER CONTEXT
  // (no requirements, but user context is extracted)
  // --------------------------------------
  router.register("GET", "/example/open", async (req, res) => {
    let user = null;

    try {
      const token = req.headers["authorization"]?.replace("Bearer ", "").trim();
      const decoded = engine.auth.verify(token);
      user = engine.user.findById(decoded.uid);
    } catch {}

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        ok: true,
        message: "Open route",
        user: user ? { id: user.id, email: user.email } : null
      })
    );
  });
}

