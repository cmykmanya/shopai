import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { status } = await request.json();

  try {
    const order = await db.order.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: 'Sipariş durumu güncellenemedi' },
      { status: 500 }
    );
  }
}