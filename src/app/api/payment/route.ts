import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// POST /api/payment - Ödeme işlemini gerçekleştir
export async function POST(request: Request) {
  const body = await request.json();
  
  try {
    // Stripe ödeme intent oluştur
    const paymentIntent = await stripe.paymentIntents.create({
      amount: body.amount, // Miktar cent cinsinden (örn. 1000 = $10.00)
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: {
        orderId: body.orderId,
        userId: body.userId,
      },
    });
    
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Ödeme işlemi sırasında bir hata oluştu.' },
      { status: 500 }
    );
  }
}