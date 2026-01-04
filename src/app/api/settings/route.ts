import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  const { key, value } = await request.json();

  try {
    const setting = await db.siteSettings.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });

    return NextResponse.json(setting);
  } catch (error) {
    return NextResponse.json(
      { error: 'Ayar kaydedilemedi' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const settings = await db.siteSettings.findMany();
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { error: 'Ayarlar yüklenemedi' },
      { status: 500 }
    );
  }
}