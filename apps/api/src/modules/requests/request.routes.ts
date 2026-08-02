import { Router } from "express";

import { authGuard } from "../../middleware/auth.js";
import { requireRole } from "../../middleware/role.js";

import * as controller from "./request.controller.js";

const router = Router();

router.use(authGuard);

router.post("/", requireRole("SUPERVISOR"), controller.create);

router.get("/mine", requireRole("SUPERVISOR"), controller.mine);

router.get("/", requireRole("PROCUREMENT", "ADMIN"), controller.all);

router.patch("/:id/status", requireRole("PROCUREMENT"), controller.status);

router.patch(
  "/:id/notes",
  requireRole("SUPERVISOR", "PROCUREMENT"),
  controller.notes,
);

export default router;
