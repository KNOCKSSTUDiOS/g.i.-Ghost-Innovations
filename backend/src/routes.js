import express from "express";
import { status } from "./index.js";

const router = express.Router();

router.get("/status", (req, res) => {
  res.json(status());
});

export default router;

