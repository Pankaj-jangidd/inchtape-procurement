import { z } from "zod";

export const createRequestSchema = z.object({
  materialName: z.string().min(2),
  quantity: z.number().int().positive(),
  unit: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
  description: z.string().optional(),
  notes: z.string().optional(),
  siteId: z.string(),
});

export const updateStatusSchema = z.object({
  status: z.enum(["NONE", "ORDERED", "NO_STOCK", "SENT", "RECEIVED"]),
});

export const updateNotesSchema = z.object({
  notes: z.string(),
});

export type CreateRequestInput = z.infer<typeof createRequestSchema>;
