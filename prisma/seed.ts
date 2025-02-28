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

  const tags = [
    { name: "Cannabis" },
    { name: "Maconha" },
    { name: "Erva" },
    { name: "Cultura canábica" },
    { name: "História da Cannabis" },
    { name: "Legalização" },
    { name: "Proibição" },
    { name: "Mercado canábico" },
    { name: "Indústria da Cannabis" },
    { name: "Política e Cannabis" },
    { name: "Cannabis medicinal" },
    { name: "Saúde com Cannabis" },
    { name: "Benefícios da Cannabis" },
    { name: "Tratamentos naturais" },
    { name: "Fitoterapia" },
    { name: "Ansiedade e Cannabis" },
    { name: "Dor crônica e Cannabis" },
    { name: "Sono e Cannabis" },
    { name: "Qualidade de vida" },
    { name: "Autocuidado" },
    { name: "Uso recreativo" },
    { name: "Experiências com Cannabis" },
    { name: "Consumo consciente" },
    { name: "Cultura 420" },
    { name: "Estilo de vida canábico" },
    { name: "Redução de danos" },
    { name: "Viagens e Cannabis" },
    { name: "Estudos científicos" },
    { name: "Efeitos da Cannabis" },
    { name: "Canabinoides" },
    { name: "THC" },
    { name: "CBD" },
    { name: "Terpenos" },
    { name: "Sistema Endocanabinoide" },
    { name: "Notícias" },
    { name: "Novas pesquisas" },
    { name: "Atualizações legislativas" },
    { name: "Mercado e tendências" },
    { name: "Casos reais" },
    { name: "Cultivo caseiro" },
    { name: "Cultivo Indoor" },
    { name: "Cultivo Outdoor" },
    { name: "Práticas sustentáveis" },
    { name: "Produtos canábicos" },
    { name: "Cosméticos com Cannabis" },
    { name: "Comida e Cannabis" },
    { name: "Extrações e óleos" },
    { name: "Ativismo canábico" },
    { name: "Eventos e feiras" },
    { name: "Influenciadores canábicos" },
  ];

  await prisma.tag.createMany({
    data: tags.map((tag) => ({
      ...tag,
      name: tag.name.toUpperCase(),
    })),
    skipDuplicates: true,
  });

  console.log("Roles seeded successfully!");
}

seed()
  .then(() => {
    console.log("Database seeded!");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
