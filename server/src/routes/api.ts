import { PrismaClient } from "@prisma/client"
import { Router } from "express";

const prisma = new PrismaClient({log: ["query", "error"]});
prisma.$on("query", (q) => {
  console.log("PARAMS:", q.params);
});

const r = Router();

r.get("/healthcheck", async (_req, res, _next) => {
  const dbOK = await prisma.$queryRaw`SELECT 1`
    .then(() => true).catch(() => false);
  res.status(dbOK ? 200 : 500).json({
    "ok": dbOK,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});