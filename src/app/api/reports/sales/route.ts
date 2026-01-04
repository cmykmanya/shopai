import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const sales = await db.order.groupBy({
      by: ['createdAt'],
      _sum: { total: true },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(sales);
  } catch (error) {
    return NextResponse.json(
      { error: 'Satış raporları yüklenemedi' },
      { status: 500 }
    );
  }
}