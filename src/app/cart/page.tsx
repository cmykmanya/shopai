'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/store/cart-store';
import { useUserStore } from '@/lib/store/user-store';
import { useUIStore } from '@/lib/store/ui-store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Truck,
  ArrowRight,
  ShoppingBag as EmptyCartIcon,
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, subtotal, total, clearCart } =
    useCartStore();
  const { isAuthenticated } = useUserStore();
  const showToast = useUIStore((state) => state.showToast);

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    setApplyingCoupon(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock coupon logic
    if (couponCode.toLowerCase() === 'save10') {
      setDiscount(subtotal * 0.1);
      showToast('Coupon applied! 10% off', 'success');
    } else if (couponCode.toLowerCase() === 'welcome20') {
      setDiscount(subtotal * 0.2);
      showToast('Welcome! 20% off', 'success');
    } else {
      showToast('Invalid coupon code', 'error');
      setDiscount(0);
    }

    setApplyingCoupon(false);
  };

  const handleQuantityUpdate = async (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      showToast('Item removed from cart', 'info');
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      showToast('Please login to continue', 'info');
      router.push('/account');
    } else {
      router.push('/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-muted/50 rounded-full">
              <EmptyCartIcon className="h-24 w-24 text-muted-foreground/50" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added anything to your cart yet
          </p>
          <Button size="lg" asChild>
            <Link href="/products">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Start Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="flex gap-4 p-4 bg-card rounded-lg border shadow-sm"
              >
                {/* Product Image */}
                <Link
                  href={`/products/${item.productId}`}
                  className="relative aspect-square h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted"
                >
                  <Image
                    src={item.image}
                    alt={item.productTitle}
                    fill
                    className="object-cover"
                    sizes="96px"
                    unoptimized
                  />
                </Link>

                {/* Product Info */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <Link
                      href={`/products/${item.productId}`}
                      className="font-medium hover:text-primary line-clamp-2"
                    >
                      {item.productTitle}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.variant.size} / {item.variant.color}
                    </p>
                  </div>

                  {/* Price & Actions */}
                  <div className="flex items-end justify-between">
                    <div className="flex items-center gap-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1 rounded-md border">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            handleQuantityUpdate(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-10 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            handleQuantityUpdate(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div>
                        <p className="font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        removeItem(item.id);
                        showToast('Item removed from cart', 'info');
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Clear Cart */}
          {items.length > 1 && (
            <Button
              variant="ghost"
              className="text-destructive hover:text-destructive"
              onClick={() => {
                clearCart();
                showToast('Cart cleared', 'info');
              }}
            >
              Clear Cart
            </Button>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Free Shipping Progress */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" />
                <p className="text-sm">
                  {subtotal >= 50
                    ? '🎉 Free shipping!'
                    : `Add $${(50 - subtotal).toFixed(2)} for free shipping`}
                </p>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Coupon Code */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Coupon Code</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={handleApplyCoupon}
                  disabled={applyingCoupon || !couponCode.trim()}
                >
                  {applyingCoupon ? '...' : 'Apply'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Try: SAVE10 or WELCOME20
              </p>
            </div>

            {/* Summary */}
            <div className="rounded-lg border bg-card p-6 space-y-3">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="font-medium text-green-600">
                    -${discount.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">
                  {subtotal >= 50 ? 'Free' : '$9.99'}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span className="font-medium">
                  ${((subtotal - discount) * 0.08).toFixed(2)}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>
                  ${(subtotal - discount + (subtotal >= 50 ? 0 : 9.99) + (subtotal - discount) * 0.08).toFixed(2)}
                </span>
              </div>

              {/* Estimated Delivery */}
              <div className="pt-3 text-sm text-muted-foreground">
                <p>Estimated delivery: 3-5 business days</p>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button variant="outline" className="w-full" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span>Encrypted</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span>Trusted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
