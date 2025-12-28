'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/store/cart-store';
import { useUserStore } from '@/lib/store/user-store';
import { useUIStore } from '@/lib/store/ui-store';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Truck,
  CreditCard,
  Lock,
  Package,
  ShoppingBag,
  Confetti as Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

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
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">
            Add some items to your cart to checkout
          </p>
          <Button size="lg" onClick={() => router.push('/products')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex justify-center"
          >
            <div className="p-6 bg-green-100 rounded-full">
              <Check className="h-16 w-16 text-green-600" />
            </div>
          </motion.div>

          <div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. You'll receive a confirmation email shortly.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Total</span>
              <span className="font-bold text-lg">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Estimated Delivery</span>
              <span>
                {deliveryOptions.find((d) => d.id === deliveryOption)?.days}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/account">View Orders</Link>
            </Button>
            <Button className="flex-1" asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => {
            const stepIndex = steps.findIndex((s) => s.id === currentStep);
            const isCompleted = stepIndex < index;
            const isCurrent = step.id === currentStep;

            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? 'bg-primary text-primary-foreground'
                        : isCurrent
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                    initial={false}
                    animate={{
                      scale: isCurrent ? 1.1 : 1,
                    }}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </motion.div>
                  <span
                    className={`mt-2 text-sm font-medium ${
                      isCurrent ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-2 ${
                      isCompleted ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {currentStep === 'shipping' && (
              <motion.form
                key="shipping"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleShippingSubmit}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        required
                        value={shippingData.fullName}
                        onChange={(e) =>
                          setShippingData({
                            ...shippingData,
                            fullName: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={shippingData.email}
                        onChange={(e) =>
                          setShippingData({
                            ...shippingData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={shippingData.phone}
                        onChange={(e) =>
                          setShippingData({
                            ...shippingData,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={shippingData.country}
                        onChange={(e) =>
                          setShippingData({
                            ...shippingData,
                            country: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      required
                      value={shippingData.address}
                      onChange={(e) =>
                        setShippingData({
                          ...shippingData,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        required
                        value={shippingData.city}
                        onChange={(e) =>
                          setShippingData({
                            ...shippingData,
                            city: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        required
                        value={shippingData.state}
                        onChange={(e) =>
                          setShippingData({
                            ...shippingData,
                            state: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        required
                        value={shippingData.zipCode}
                        onChange={(e) =>
                          setShippingData({
                            ...shippingData,
                            zipCode: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="saveAddress"
                      checked={shippingData.saveAddress}
                      onCheckedChange={(checked) =>
                        setShippingData({
                          ...shippingData,
                          saveAddress: checked as boolean,
                        })
                      }
                    />
                    <Label htmlFor="saveAddress" className="text-sm">
                      Save this address for future orders
                    </Label>
                  </div>
                </div>

                <Separator />

                {/* Delivery Options */}
                <div>
                  <h3 className="font-semibold mb-4">Delivery Options</h3>
                  <RadioGroup
                    value={deliveryOption}
                    onValueChange={setDeliveryOption}
                  >
                    {deliveryOptions.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value={option.id} id={option.id} />
                          <Label htmlFor={option.id} className="cursor-pointer">
                            <div>
                              <p className="font-medium">{option.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {option.days}
                              </p>
                            </div>
                          </Label>
                        </div>
                        <span className="font-bold">
                          {option.price === 0 ? 'Free' : `+$${option.price.toFixed(2)}`}
                        </span>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Continue to Payment
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.form>
            )}

            {currentStep === 'payment' && (
              <motion.form
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handlePaymentSubmit}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

                  {/* Payment Method Tabs */}
                  <RadioGroup
                    value={paymentData.method}
                    onValueChange={(value: any) =>
                      setPaymentData({ ...paymentData, method: value })
                    }
                    className="grid grid-cols-3 gap-4"
                  >
                    <Label className="cursor-pointer">
                      <RadioGroupItem value="card" id="card" className="peer sr-only" />
                      <div className="flex flex-col items-center p-4 border-2 rounded-lg peer-checked:border-primary peer-checked:bg-primary/5 transition-colors">
                        <CreditCard className="h-8 w-8 mb-2" />
                        <span className="text-sm font-medium">Card</span>
                      </div>
                    </Label>

                    <Label className="cursor-pointer">
                      <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
                      <div className="flex flex-col items-center p-4 border-2 rounded-lg peer-checked:border-primary peer-checked:bg-primary/5 transition-colors">
                        <Sparkles className="h-8 w-8 mb-2" />
                        <span className="text-sm font-medium">PayPal</span>
                      </div>
                    </Label>

                    <Label className="cursor-pointer">
                      <RadioGroupItem value="applepay" id="applepay" className="peer sr-only" />
                      <div className="flex flex-col items-center p-4 border-2 rounded-lg peer-checked:border-primary peer-checked:bg-primary/5 transition-colors">
                        <Lock className="h-8 w-8 mb-2" />
                        <span className="text-sm font-medium">Apple Pay</span>
                      </div>
                    </Label>
                  </RadioGroup>

                  {/* Card Form */}
                  {paymentData.method === 'card' && (
                    <div className="mt-6 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={paymentData.cardNumber}
                          onChange={(e) =>
                            setPaymentData({
                              ...paymentData,
                              cardNumber: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry *</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={paymentData.expiry}
                            onChange={(e) =>
                              setPaymentData({
                                ...paymentData,
                                expiry: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={paymentData.cvv}
                            onChange={(e) =>
                              setPaymentData({
                                ...paymentData,
                                cvv: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on Card *</Label>
                        <Input
                          id="cardName"
                          value={paymentData.name}
                          onChange={(e) =>
                            setPaymentData({
                              ...paymentData,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Security Badges */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  <span>Secure 256-bit SSL encryption</span>
                  <Badge variant="outline">PCI DSS Compliant</Badge>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep('shipping')}
                  >
                    <ChevronLeft className="mr-2 h-5 w-5" />
                    Back
                  </Button>
                  <Button type="submit" size="lg" className="flex-1">
                    Review Order
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.form>
            )}

            {currentStep === 'review' && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-6">Review Your Order</h2>

                  {/* Order Items */}
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                          <Image
                            src={item.image}
                            alt={item.productTitle}
                            fill
                            className="object-cover"
                            sizes="64px"
                            unoptimized
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.productTitle}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.variant.size} / {item.variant.color} × {item.quantity}
                          </p>
                        </div>
                        <span className="font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Shipping Address */}
                <div>
                  <h3 className="font-semibold mb-3">Shipping Address</h3>
                  <div className="text-sm space-y-1">
                    <p>{shippingData.fullName}</p>
                    <p>{shippingData.address}</p>
                    <p>
                      {shippingData.city}, {shippingData.state}{' '}
                      {shippingData.zipCode}
                    </p>
                    <p>{shippingData.country}</p>
                  </div>
                </div>

                <Separator />

                {/* Payment Method */}
                <div>
                  <h3 className="font-semibold mb-3">Payment Method</h3>
                  <p className="text-sm">
                    {paymentData.method === 'card'
                      ? 'Card ending in ****'
                      : paymentData.method === 'paypal'
                      ? 'PayPal'
                      : 'Apple Pay'}
                  </p>
                </div>

                {/* Terms */}
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the Terms of Service and Privacy Policy. I understand
                    that my order is subject to the return policy.
                  </Label>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep('payment')}
                  >
                    <ChevronLeft className="mr-2 h-5 w-5" />
                    Back
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1"
                    onClick={handlePlaceOrder}
                    disabled={loading}
                  >
                    {loading ? (
                      'Processing...'
                    ) : (
                      <>
                        Place Order
                        <Sparkles className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-lg border bg-card p-6 space-y-4">
              <h2 className="font-semibold text-lg">Order Summary</h2>

              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.productTitle} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="text-sm text-muted-foreground text-center">
                <Truck className="h-4 w-4 inline mr-2" />
                Estimated delivery:{' '}
                {deliveryOptions.find((d) => d.id === deliveryOption)?.days}
              </div>
            </div>

            {/* Promo Code */}
            <div className="rounded-lg border bg-card p-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Promo Code</Label>
                <div className="flex gap-2">
                  <Input placeholder="Enter code" className="flex-1" />
                  <Button variant="outline" size="sm">
                    Apply
                  </Button>
                </div>
              </div>
            </div>

            {/* Secure Checkout Badge */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span>Secure checkout powered by Stripe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
