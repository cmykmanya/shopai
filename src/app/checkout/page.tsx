'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle, 
  CreditCard, 
  Truck, 
  Gift,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCartStore } from '@/lib/store/cart-store';
import { useUIStore } from '@/lib/store/ui-store';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  variant: {
    size: string;
    color: string;
  };
}

interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: 'card' | 'paypal' | 'applepay';
  shippingMethod: 'standard' | 'express';
  promoCode?: string;
  giftMessage?: string;
}

interface CartItem {
  id: string;
  productId: string;
  productTitle: string;
  image: string;
  price: number;
  quantity: number;
  variant: {
    size: string;
    color: string;
    colorHex: string;
  };
}

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const openQuickView = useUIStore((state) => state.openQuickView);
  
  const { items, clearCart, removeItem, updateQuantity } = useCartStore();
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Turkey',
    paymentMethod: 'card',
    shippingMethod: 'standard'
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  // Load cart items and initialize form
  useEffect(() => {
    // Initialize form with user data if available
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setFormData(prev => ({
          ...prev,
          fullName: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || ''
        }));
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    }
  }, []);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = formData.shippingMethod === 'express' ? 15 : 5;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shippingCost - discount;

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handlePromoApply = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true);
      toast({
        title: "Promosyon Uygulandı",
        description: "10% indirim uygulandı.",
      });
    } else {
      toast({
        title: "Geçersiz Promosyon",
        description: "Lütfen geçerli bir promosyon kodu girin.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast({
        title: "Sepet Boş",
        description: "Lütfen önce sepetinize ürün ekleyin.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save order to localStorage
      const order = {
        id: `ORD-${Date.now()}`,
        items,
        total,
        shipping: shippingCost,
        discount,
        customer: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone
        },
        address: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        paymentMethod: formData.paymentMethod,
        shippingMethod: formData.shippingMethod,
        orderDate: new Date().toISOString()
      };

      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem('orders', JSON.stringify([order, ...existingOrders]));
      
      // Clear cart
      clearCart();
      
      // Show success message
      toast({
        title: "Sipariş Alındı",
        description: "Siparişiniz başarıyla oluşturuldu. Teşekkürler!",
      });

      // Redirect to order success page
      router.push('/checkout/success');
      
    } catch (error) {
      toast({
        title: "Hata",
        description: "Siparişiniz işlenirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackToCart = () => {
    router.push('/cart');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Sepetiniz Boş</h2>
          <p className="text-muted-foreground mb-8">Önce alışveriş yapmalısınız.</p>
          <Button onClick={() => router.push('/products')}>Alışverişe Başla</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={handleBackToCart}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Sepete Geri Dön
          </Button>
          <h1 className="text-3xl font-bold">Ödeme</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Sipariş Özeti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <AnimatePresence mode="wait">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center gap-4 border-b pb-4"
                    >
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.productTitle}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.productTitle}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.variant.size} • {item.variant.color}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-3 py-1">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)} each
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Ödeme Bilgileri</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Customer Info */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Müşteri Bilgileri</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Ad Soyad</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  {/* Address Info */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Adres Bilgileri</h4>
                    <div className="space-y-2">
                      <Label htmlFor="address">Adres</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Şehir</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">İlçe</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">Posta Kodu</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping Method */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Kargo Seçimi</h4>
                    <div className="space-y-2">
                      <Label className="flex items-center">
                        <input
                          type="radio"
                          value="standard"
                          checked={formData.shippingMethod === 'standard'}
                          onChange={(e) => setFormData(prev => ({ ...prev, shippingMethod: e.target.value as 'standard' | 'express' }))}
                          className="mr-2"
                        />
                        <div className="flex items-center justify-between w-full">
                          <span>Standart Kargo (5$)</span>
                          <span className="text-sm text-muted-foreground">3-5 iş günü</span>
                        </div>
                      </Label>
                      <Label className="flex items-center">
                        <input
                          type="radio"
                          value="express"
                          checked={formData.shippingMethod === 'express'}
                          onChange={(e) => setFormData(prev => ({ ...prev, shippingMethod: e.target.value as 'standard' | 'express' }))}
                          className="mr-2"
                        />
                        <div className="flex items-center justify-between w-full">
                          <span>Express Kargo (15$)</span>
                          <span className="text-sm text-muted-foreground">1-2 iş günü</span>
                        </div>
                      </Label>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Ödeme Yöntemi</h4>
                    <div className="space-y-2">
                      <Label className="flex items-center">
                        <input
                          type="radio"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value as 'card' | 'paypal' | 'applepay' }))}
                          className="mr-2"
                        />
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <span>Kredi Kartı</span>
                        </div>
                      </Label>
                      <Label className="flex items-center">
                        <input
                          type="radio"
                          value="paypal"
                          checked={formData.paymentMethod === 'paypal'}
                          onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value as 'card' | 'paypal' | 'applepay' }))}
                          className="mr-2"
                        />
                        <div className="flex items-center gap-2">
                          <span>PayPal</span>
                        </div>
                      </Label>
                      <Label className="flex items-center">
                        <input
                          type="radio"
                          value="applepay"
                          checked={formData.paymentMethod === 'applepay'}
                          onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value as 'card' | 'paypal' | 'applepay' }))}
                          className="mr-2"
                        />
                        <div className="flex items-center gap-2">
                          <span>Apple Pay</span>
                        </div>
                      </Label>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Promosyon Kodu</h4>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Promosyon kodu"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button
                        type="button"
                        onClick={handlePromoApply}
                        disabled={promoApplied}
                      >
                        Uygula
                      </Button>
                    </div>
                    {promoApplied && (
                      <Badge variant="secondary" className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        10% indirim uygulandı
                      </Badge>
                    )}
                  </div>

                  {/* Order Summary */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Sipariş Özeti</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Alt Toplam:</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Kargo:</span>
                        <span>${shippingCost.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>İndirim:</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Toplam:</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'İşleniyor...' : `Ödeme Yap - $${total.toFixed(2)}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
