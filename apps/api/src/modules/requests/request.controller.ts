import { Request, Response } from "express";
import * as service from "./request.service.js";
import {
  createRequestSchema,
  updateNotesSchema,
  updateStatusSchema,
} from "./request.schema.js";

export async function create(req: Request, res: Response) {
  const body = createRequestSchema.parse(req.body);

  const request = await service.createRequest(body, req.user!.userId);

  res.status(201).json(request);
}

export async function mine(req: Request, res: Response) {
  const requests = await service.getMyRequests(req.user!.userId);

  res.json(requests);
}

export async function all(_req: Request, res: Response) {
  res.json(await service.getAllRequests());
}

export async function status(req: Request, res: Response) {
  const body = updateStatusSchema.parse(req.body);

  const request = await service.updateStatus(
    req.params.id as string,
    body.status,
    req.user!.userId,
  );

  res.json(request);
}

export async function notes(req: Request, res: Response) {
  const body = updateNotesSchema.parse(req.body);

  const request = await service.updateNotes(
    req.params.id as string,
    body.notes,
  );

  res.json(request);
}
