import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHashes = {
    admin: await bcrypt.hash("admin123", 10),
    procurement: await bcrypt.hash("procurement123", 10),
    supervisor: await bcrypt.hash("supervisor123", 10),
  };

  await prisma.user.upsert({
    where: {
      email: "admin@inchtape.com",
    },
    update: {},
    create: {
      name: "Admin",
      email: "admin@inchtape.com",
      passwordHash: passwordHashes.admin,
      role: Role.ADMIN,
    },
  });

  await prisma.user.upsert({
    where: {
      email: "procurement@inchtape.com",
    },
    update: {},
    create: {
      name: "Procurement",
      email: "procurement@inchtape.com",
      passwordHash: passwordHashes.procurement,
      role: Role.PROCUREMENT,
    },
  });

  await prisma.user.upsert({
    where: {
      email: "supervisor@inchtape.com",
    },
    update: {},
    create: {
      name: "Supervisor",
      email: "supervisor@inchtape.com",
      passwordHash: passwordHashes.supervisor,
      role: Role.SUPERVISOR,
    },
  });

  console.log("✅ Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
