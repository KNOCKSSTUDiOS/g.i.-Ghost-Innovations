import { protectAdminRoute } from "./server-admin-protect";
import { recentEvents } from "./gi-logs/recent";

export function attachAdmin(app) {
  app.get("/admin/logs", protectAdminRoute, (req, res) => {
    res.json({
      identity: req.gi_identity,
      events: recentEvents()
    });
  });
}

