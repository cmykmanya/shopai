import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST /api/orders - Yeni sipariş oluştur
export async function POST(request: Request) {
  const body = await request.json();
  
  try {
    const order = await prisma.order.create({
      data: {
        userId: body.userId,
        items: body.items,
        totalAmount: body.totalAmount,
        status: body.status || 'Processing',
        shippingAddress: body.shippingAddress,
        paymentMethod: body.paymentMethod,
      },
    });
    
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: 'Sipariş oluşturulurken bir hata oluştu.' },
      { status: 500 }
    );
  }
}

// GET /api/orders - Kullanıcının siparişlerini listele
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  if (!userId) {
    return NextResponse.json(
      { error: 'userId parametresi zorunludur.' },
      { status: 400 }
    );
  }
  
  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: 'Siparişler getirilirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}