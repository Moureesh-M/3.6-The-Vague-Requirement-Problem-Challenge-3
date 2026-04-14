const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.task.deleteMany({});

  // Seed tasks
  await prisma.task.createMany({
    data: [
      { title: 'Finish assignment', completed: false, important: true },
      { title: 'Review lecture notes', completed: true, important: false },
      { title: 'Complete coding challenge', completed: false, important: true },
    ],
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
