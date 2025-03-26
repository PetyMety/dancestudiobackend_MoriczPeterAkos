const { PrismaClient } = require('@prisma/client');
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // Feltételezzük, hogy már van legalább 1 course a courses táblában
  const courses = await prisma.courses.findMany();

  for (let i = 0; i < 15; i++) {
    const randomCourse = courses[Math.floor(Math.random() * courses.length)];
    
    await prisma.applications.create({
      data: {
        course_id: randomCourse.id,
        price: faker.number.int({ min: 1000, max: 5000 }), // Véletlen ár 1000 és 5000 között
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  }

  console.log('15 random applications created!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });