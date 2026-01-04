'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/store/cart-store';
import { useUserStore } from '@/lib/store/user-store';
import { useUIStore } from '@/lib/store/ui-store';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, CreditCard, Lock, Package, ShoppingBag, Truck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';

type CheckoutStep = 'shipping' | 'payment' | 'review';

interface ShippingFormData {
  email: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  saveAddress: boolean;
}

interface PaymentFormData {
  method: 'card' | 'paypal' | 'applepay';
  cardNumber: string;
  expiry: string;
  cvv: string;
  name: string;
  sameAsShipping: boolean;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();
  const { user, addOrder } = useUserStore();
  const showToast = useUIStore((state) => state.showToast);

  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const [shippingData, setShippingData] = useState<ShippingFormData>({
    email: user?.email || '',
    fullName: user?.name || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    saveAddress: false,
  });

  const [deliveryOption, setDeliveryOption] = useState('standard');

  const [paymentData, setPaymentData] = useState<PaymentFormData>({
    method: 'card',
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: user?.name || '',
    sameAsShipping: true,
  });

  const steps = [
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'review', label: 'Review', icon: Package },
  ];

  const deliveryOptions = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      price: 0,
      days: '5-7 business days',
    },
    {
      id: 'express',
      name: 'Express Shipping',
      price: 10,
      days: '2-3 business days',
    },
    {
      id: 'overnight',
      name: 'Next Day Delivery',
      price: 20,
      days: '1 business day',
    },
  ];

  const shippingCost = deliveryOptions.find((d) => d.id === deliveryOption)?.price || 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('review');
  };

  const handlePlaceOrder = async () => {
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Create order
    const newOrder = {
      id: `ORD-${Date.now()}`,
      userId: user?.id || `guest-${Date.now()}`,
      status: 'Processing' as const,
      items: items.map((item) => ({
        productId: item.productId,
        productTitle: item.productTitle,
        image: item.image,
        variant: item.variant,
        quantity: item.quantity,
        price: item.price,
      })),
      subtotal,
      discount: 0,
      shipping: shippingCost,
      tax,
      total,
      shippingAddress: {
        id: `addr-${Date.now()}`,
        fullName: shippingData.fullName,
        street: shippingData.address,
        city: shippingData.city,
        state: shippingData.state,
        zipCode: shippingData.zipCode,
        country: shippingData.country,
        phone: shippingData.phone,
        isDefault: false,
      },
      paymentMethod:
        paymentData.method === 'card'
          ? 'Card ending in ****'
          : paymentData.method === 'paypal'
          ? 'PayPal'
          : 'Apple Pay',
      orderDate: new Date().toISOString(),
    };

    if (user?.id) {
      addOrder(newOrder);
    }

    clearCart();
    setLoading(false);
    setOrderComplete(true);
    showToast('Order placed successfully!', 'success');
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="h-24 w-24 text-muted-foreground/50 mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</

