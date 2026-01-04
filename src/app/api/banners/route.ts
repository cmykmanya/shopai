import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const banners = await db.banner.findMany();
    return NextResponse.json(banners);
  } catch (error) {
    return NextResponse.json(
      { error: 'Bannerlar yüklenemedi' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { title, description, image, cta, link, isActive } = await request.json();

  try {
    const banner = await db.banner.create({
      data: { title, description, image, cta, link, isActive },
    });

    return NextResponse.json(banner);
  } catch (error) {
    return NextResponse.json(
      { error: 'Banner eklenemedi' },
      { status: 500 }
    );
  }
}