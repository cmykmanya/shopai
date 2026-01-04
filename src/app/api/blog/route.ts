import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  const { title, content, slug, excerpt, image, published } = await request.json();

  try {
    const blog = await db.blog.create({
      data: { title, content, slug, excerpt, image, published },
    });

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { error: 'Blog yazısı eklenemedi' },
      { status: 500 }
    );
  }
}