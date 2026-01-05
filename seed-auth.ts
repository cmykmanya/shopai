import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    // Check if admin user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: 'admin@example.com' }
    });

    if (!existingUser) {
      // Create admin user with hashed password
      const hashedPassword = await bcrypt.hash('password', 10);
      
      await prisma.user.create({
        data: {
          name: 'Admin User',
          email: 'admin@example.com',
          password: hashedPassword,
          role: 'ADMIN'
        }
      });

      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }

    // Create some test categories if they don't exist
    const existingCategory = await prisma.category.findFirst({
      where: { slug: 'women' }
    });

    if (!existingCategory) {
      await prisma.category.createMany({
        data: [
          {
            name: 'Kadın',
            slug: 'women',
            description: 'Kadın giyim kategorisi',
            isActive: true,
            priority: 1
          },
          {
            name: 'Erkek',
            slug: 'men',
            description: 'Erkek giyim kategorisi',
            isActive: true,
            priority: 2
          },
          {
            name: 'Çocuk',
            slug: 'kids',
            description: 'Çocuk giyim kategorisi',
            isActive: true,
            priority: 3
          }
        ]
      });

      console.log('Test categories created successfully');
    } else {
      console.log('Categories already exist');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();