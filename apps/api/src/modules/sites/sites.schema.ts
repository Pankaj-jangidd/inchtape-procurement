import { z } from "zod";

export const createSiteSchema = z.object({
  name: z.string().min(2),
  code: z.string().min(2),
  address: z.string().optional(),
  type: z.enum(["INCHTAPE", "KG", "OTHER"]).default("INCHTAPE"),
});

export type CreateSiteInput = z.infer<typeof createSiteSchema>;
