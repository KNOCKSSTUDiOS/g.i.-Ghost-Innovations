import express from "express";
import { runLanguageOp } from "./gi-language/engine";
import { gatherLanguageContext } from "./gi-language/context";

export function attachLanguage(app: express.Express) {
  app.post("/language/op", async (req, res) => {
    const { user_id, type, input, metadata } = req.body;
    res.json(await runLanguageOp(user_id, type, input, metadata));
  });

  app.get("/language/context/:project_id", (req, res) => {
    res.json(gatherLanguageContext(req.params.project_id));
  });
}

