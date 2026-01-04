import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const seoSettings = await db.sEOSettings.findFirst();
    return NextResponse.json(seoSettings || {});
  } catch (error) {
    return NextResponse.json(
      { error: 'SEO ayarları yüklenemedi' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { siteName, siteDescription, keywords, ogImage, twitterCard } = await request.json();

  try {
    const seoSettings = await db.sEOSettings.upsert({
      where: { id: "1" },
      update: { siteName, siteDescription, keywords, ogImage, twitterCard },
      create: { siteName, siteDescription, keywords, ogImage, twitterCard },
    });

    return NextResponse.json(seoSettings);
  } catch (error) {
    return NextResponse.json(
      { error: 'SEO ayarları kaydedilemedi' },
      { status: 500 }
    );
  }
}