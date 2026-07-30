import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { prisma } from "./config/prisma.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRouter from "./modules/auth/index.js";
import { authGuard } from "./middleware/auth.js";

const app = express();

app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(express.json());
app.use("/api/v1/auth", authRouter);

// Simple liveness check
app.get("/api/v1/health", (_req, res) => {
  res.json({ status: "ok", service: "inchtape-procurement-api" });
});

// Confirms Prisma can actually reach the Supabase Postgres instance —
// this is the real "Milestone 0 done" check.
app.get("/api/v1/health/db", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", database: "connected" });
  } catch (err) {
    res.status(500).json({
      status: "error",
      database: "unreachable",
      message: err instanceof Error ? err.message : "unknown error",
    });
  }
});

app.use(errorHandler);

app.listen(env.port, () => {
  console.log(
    `InchTape Procurement API running on http://localhost:${env.port}`,
  );
});

app.get("/api/v1/protected", authGuard, (req, res) => {
  res.json({
    message: "Protected route working",
    user: req.user,
  });
});
