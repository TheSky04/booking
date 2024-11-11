const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { id: 1, name: "Eray Aslan" },
      { id: 2, name: "Enes Faruk Meniz" },
      { id: 3, name: "Sefa Eren Şahin" },
      { id: 4, name: "Kadir Mutlu" },
    ],
    skipDuplicates: true,
  });

  await prisma.book.createMany({
    data: [
      { id: 1, title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", year: 1979 },
      { id: 2, title: "I, Robot", author: "Isaac Asimov", year: 1950 },
      { id: 3, title: "Dune", author: "Frank Herbert", year: 1965 },
      { id: 4, title: "1984", author: "George Orwell", year: 1949 },
      { id: 5, title: "Brave New World", author: "Aldous Huxley", year: 1932 },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
