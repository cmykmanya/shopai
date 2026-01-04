'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, Home, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products } from '@/lib/mock-data';
import { ProductCard } from '@/components/ProductCard';

export default function CheckoutSuccessPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block mb-6"
          >
            <CheckCircle2 className="h-20 w-20 text-green-500" />
          </motion.div>

          <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-xl text-muted-foreground">
            Thank you for your purchase. We've sent a confirmation email.
          </p>
        </motion.div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="border rounded-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Order Details</h2>
            <Badge variant="secondary">Processing</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Order Number</p>
              <p className="font-semibold">ORD-{Date.now()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
              <p className="font-semibold">
                {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(
                  'en-US',
                  {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  }
                )}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Shipping Address</p>
              <p className="font-semibold">John Doe</p>
              <p className="text-sm">123 Main Street</p>
              <p className="text-sm">New York, NY 10001</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
              <p className="font-semibold">Visa ending in 4242</p>
            </div>
          </div>
        </motion.div>

        {/* Recommended Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            {products.slice(10, 14).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" variant="outline" onClick={() => router.push('/account')}>
            <Package className="mr-2 h-5 w-5" />
            View Order
          </Button>
          <Button size="lg" asChild>
            <Link href="/products">
              Continue Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
