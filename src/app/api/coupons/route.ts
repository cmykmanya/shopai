import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/coupons - Kupon kodunu doğrula
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  
  if (!code) {
    return NextResponse.json(
      { error: 'Kupon kodu zorunludur.' },
      { status: 400 }
    );
  }
  
  try {
    const coupon = await prisma.coupon.findUnique({
      where: { code },
    });
    
    if (!coupon) {
      return NextResponse.json(
        { error: 'Geçersiz kupon kodu.' },
        { status: 404 }
      );
    }
    
    // Kuponun geçerlilik tarihini kontrol et
    const now = new Date();
    if (coupon.validUntil < now || coupon.validFrom > now) {
      return NextResponse.json(
        { error: 'Kupon kodu süresi dolmuş.' },
        { status: 400 }
      );
    }
    
    if (!coupon.isActive) {
      return NextResponse.json(
        { error: 'Kupon kodu aktif değil.' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(coupon);
  } catch (error) {
    return NextResponse.json(
      { error: 'Kupon kodu doğrulanırken bir hata oluştu.' },
      { status: 500 }
    );
  }
}