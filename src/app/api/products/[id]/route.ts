import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/products/[id] - Tek bir ürünün detaylarını getir
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { reviews: true }, // Ürün incelemelerini de getir
    });
    
    if (!product) {
      return NextResponse.json(
        { error: 'Ürün bulunamadı.' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Ürün detayları getirilirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}