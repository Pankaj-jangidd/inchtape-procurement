import { Router } from "express";

import * as controller from "./sites.controller.js";

import { authGuard } from "../../middleware/auth.js";
import { requireRole } from "../../middleware/role.js";

const router = Router();

router.use(authGuard);

router.post("/", requireRole("SUPERVISOR", "ADMIN"), controller.createSite);

router.get("/mine", requireRole("SUPERVISOR"), controller.mySites);

router.get("/", requireRole("ADMIN", "PROCUREMENT"), controller.allSites);

export default router;
