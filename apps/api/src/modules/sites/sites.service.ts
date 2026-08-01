import { prisma } from "../../config/prisma.js";
import type { CreateSiteInput } from "./sites.schema.js";

export async function createSite(data: CreateSiteInput, createdById: string) {
  return prisma.site.create({
    data: {
      ...data,
      createdById,
    },
  });
}

export async function getMySites(userId: string) {
  return prisma.site.findMany({
    where: {
      OR: [
        { createdById: userId },
        {
          supervisors: {
            some: {
              supervisorId: userId,
            },
          },
        },
      ],
      isActive: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAllSites() {
  return prisma.site.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
