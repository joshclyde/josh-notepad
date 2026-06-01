import { Router } from "express";
import type { PingResponse } from "../types.js";

const router = Router();

router.get("/ping", (_req, res) => {
  const body: PingResponse = {
    message: "pong",
    timestamp: new Date().toISOString(),
  };
  res.json(body);
});

export default router;
