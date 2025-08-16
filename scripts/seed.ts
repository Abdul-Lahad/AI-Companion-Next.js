const { PrismaClient } = require('../lib/generated/prisma');


const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: "Famous People" },
        { name: "Movies & TV" },
        { name: "Musicians" },
        { name: "Animals" },
        { name: "Philosophy" },
        { name: "Scientists" },
      ],
    });

    console.log("✅ Categories seeded successfully!");
  } catch (err) {
    console.error("❌ Error seeding categories:", err);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

main();
