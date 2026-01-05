import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Fetch categories with their subcategories
    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
      },
      include: {
        subcategories: {
          where: {
            isActive: true,
          },
          orderBy: {
            priority: 'asc',
          },
        },
      },
      orderBy: {
        priority: 'asc',
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description, image, priority } = body;

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        image,
        priority,
        isActive: true,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}