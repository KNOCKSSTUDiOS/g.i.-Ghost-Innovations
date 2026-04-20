// Admin extension for G.I. platform
// Provides log snapshots for the admin dashboard.

import express from "express";
import { recentEvents } from "./gi-logs/recent";

export function attachAdminRoutes(app: express.Express) {
  app.get("/admin/logs", (req, res) => {
    res.json(recentEvents());
  });
}

