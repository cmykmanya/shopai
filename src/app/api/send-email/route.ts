import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// POST /api/send-email - E-posta gönder
// E-posta göndermek için Nodemailer kullanıyoruz.
export async function POST(request: Request) {
  const body = await request.json();
  
  // Nodemailer transporter oluştur
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  
  try {
    // E-posta gönder
    await transporter.sendMail({
      from: `"ShopAI" <${process.env.SMTP_USER}>`,
      to: body.to,
      subject: body.subject,
      html: body.html,
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'E-posta gönderilirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}