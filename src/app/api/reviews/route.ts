import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const reviews = await db.review.findMany({
      include: { user: true, product: true },
    });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json(
      { error: 'Yorumlar yüklenemedi' },
      { status: 500 }
    );
  }
}