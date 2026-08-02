import { prisma } from "../../config/prisma.js";
import type { CreateRequestInput } from "./request.schema.js";
import { RequestStatus } from "@prisma/client";

export async function createRequest(
  data: CreateRequestInput,
  createdById: string,
) {
  return prisma.request.create({
    data: {
      ...data,
      createdById,
    },
    include: {
      site: true,
      createdBy: true,
    },
  });
}

export async function getMyRequests(userId: string) {
  return prisma.request.findMany({
    where: {
      createdById: userId,
      archivedAt: null,
    },
    include: {
      site: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAllRequests() {
  return prisma.request.findMany({
    where: {
      archivedAt: null,
    },
    include: {
      site: true,
      createdBy: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function updateStatus(
  id: string,
  status: RequestStatus,
  userId: string,
) {
  const existing = await prisma.request.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("Request not found");
  }

  return prisma.$transaction(async (tx) => {
    const request = await tx.request.update({
      where: { id },
      data: { status },
    });

    await tx.statusHistory.create({
      data: {
        requestId: id,
        fromStatus: existing.status,
        toStatus: status,
        changedById: userId,
      },
    });

    return request;
  });
}

export async function updateNotes(id: string, notes: string) {
  return prisma.request.update({
    where: { id },
    data: { notes },
  });
}
