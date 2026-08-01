import { Request, Response } from "express";

import { createSiteSchema } from "./sites.schema.js";
import * as siteService from "./sites.service.js";

export async function createSite(req: Request, res: Response) {
  const body = createSiteSchema.parse(req.body);

  const site = await siteService.createSite(body, req.user!.userId);

  res.status(201).json(site);
}

export async function mySites(req: Request, res: Response) {
  const sites = await siteService.getMySites(req.user!.userId);

  res.json(sites);
}

export async function allSites(_req: Request, res: Response) {
  const sites = await siteService.getAllSites();

  res.json(sites);
}
