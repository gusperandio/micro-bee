import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const roles = ["ADMIN", "USER", "MODERATOR", "EDITOR"];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role },
      update: {},
      create: { name: role, description: `${role} role` },
    });
  }

  console.log("Roles seeded successfully!");
}

seed()
  .then(()=>{
    console.log('Database seeded!');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
