import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/products - Tüm ürünleri listele
// Query Parametreleri:
// - category: Kategori adı
// - sort: Sıralama (price-low, price-high, newest, bestselling)
// - minPrice: Minimum fiyat
// - maxPrice: Maksimum fiyat
// - brand: Marka adı
// - size: Beden
// - color: Renk
// - minRating: Minimum puan
// - inStock: Stok durumu (true/false)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // Filtreleme parametrelerini al
  const category = searchParams.get('category');
  const sort = searchParams.get('sort');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const brand = searchParams.get('brand');
  const size = searchParams.get('size');
  const color = searchParams.get('color');
  const minRating = searchParams.get('minRating');
  const inStock = searchParams.get('inStock');
  
  // Sıralama ayarları
  let orderBy: any = {};
  switch (sort) {
    case 'price-low':
      orderBy = { price: 'asc' };
      break;
    case 'price-high':
      orderBy = { price: 'desc' };
      break;
    case 'newest':
      orderBy = { createdAt: 'desc' };
      break;
    case 'bestselling':
      orderBy = { reviewCount: 'desc' };
      break;
    default:
      orderBy = { isTrending: 'desc' };
  }
  
  // Filtreleme ayarları
  const where: any = {};
  if (category) {
    where.category = category;
  }
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = parseFloat(minPrice);
    if (maxPrice) where.price.lte = parseFloat(maxPrice);
  }
  if (brand) {
    where.brand = brand;
  }
  if (size) {
    where.sizes = { has: size };
  }
  if (color) {
    where.colors = { array_contains: [{ name: color }] };
  }
  if (minRating) {
    where.rating = { gte: parseFloat(minRating) };
  }
  if (inStock) {
    where.inStock = inStock === 'true';
  }
  
  try {
    const products = await prisma.product.findMany({
      where,
      orderBy,
    });
    
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Ürünler getirilirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}