import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { isApproved } = await request.json();

  try {
    const review = await db.review.update({
      where: { id },
      data: { isApproved },
    });

    return NextResponse.json(review);
  } catch (error) {
    return NextResponse.json(
      { error: 'Yorum güncellenemedi' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await db.review.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Yorum silinemedi' },
      { status: 500 }
    );
  }
}