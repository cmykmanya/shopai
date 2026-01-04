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

// Türkçe çeviriler
type CheckoutStep = 'kargo' | 'odeme' | 'inceleme';

interface KargoFormuVerisi {
  email: string;
  tamAd: string;
  telefon: string;
  adres: string;
  sehir: string;
  ilce: string;
  postaKodu: string;
  ulke: string;
  adresKaydet: boolean;
}

interface OdemeFormuVerisi {
  yontem: 'kart' | 'paypal' | 'applepay';
  kartNumarasi: string;
  sonKullanma: string;
  cvv: string;
  kartUzerindekiIsim: string;
  kargoAdresiyleAyni: boolean;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();
  const { user, addOrder } = useUserStore();
  const showToast = useUIStore((state) => state.showToast);

  const [currentStep, setCurrentStep] = useState<CheckoutStep>('kargo');
  const [loading, setLoading] = useState(false);
  const [siparisTamamlandi, setSiparisTamamlandi] = useState(false);

  const [kargoVerisi, setKargoVerisi] = useState<KargoFormuVerisi>({
    email: user?.email || '',
    tamAd: user?.name || '',
    telefon: '',
    adres: '',
    sehir: '',
    ilce: '',
    postaKodu: '',
    ulke: 'Türkiye',
    adresKaydet: false,
  });

  const [teslimatSecenegi, setTeslimatSecenegi] = useState('standart');

  const [odemeVerisi, setOdemeVerisi] = useState<OdemeFormuVerisi>({
    yontem: 'kart',
    kartNumarasi: '',
    sonKullanma: '',
    cvv: '',
    kartUzerindekiIsim: user?.name || '',
    kargoAdresiyleAyni: true,
  });

  const adimlar = [
    { id: 'kargo', label: 'Kargo Bilgileri', icon: Truck },
    { id: 'odeme', label: 'Ödeme', icon: CreditCard },
    { id: 'inceleme', label: 'İnceleme', icon: Package },
  ];

  const teslimatSecenekleri = [
    {
      id: 'standart',
      name: 'Standart Kargo',
      price: 0,
      days: '5-7 iş günü',
    },
    {
      id: 'express',
      name: 'Hızlı Kargo',
      price: 10,
      days: '2-3 iş günü',
    },
    {
      id: 'aynigun',
      name: 'Aynı Gün Teslimat',
      price: 20,
      days: '1 iş günü',
    },
  ];

  const kargoUcreti = teslimatSecenekleri.find((d) => d.id === teslimatSecenegi)?.price || 0;
  const vergi = subtotal * 0.08;
  const toplam = subtotal + kargoUcreti + vergi;

  const handleKargoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('odeme');
  };

  const handleOdemeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('inceleme');
  };

  const handleSiparisiTamamla = async () => {
    setLoading(true);

    // API çağrısını simüle et
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Sipariş oluştur
    const yeniSiparis = {
      id: `SIP-${Date.now()}`,
      userId: user?.id || `misafir-${Date.now()}`,
      status: 'İşleniyor' as const,
      items: items.map((item) => ({
        productId: item.productId,
        productTitle: item.productTitle,
        image: item.image,
        variant: item.variant,
        quantity: item.quantity,
        price: item.price,
      })),
      subtotal,
      indirim: 0,
      kargo: kargoUcreti,
      vergi,
      toplam,
      kargoAdresi: {
        id: `adr-${Date.now()}`,
        tamAd: kargoVerisi.tamAd,
        sokak: kargoVerisi.adres,
        sehir: kargoVerisi.sehir,
        ilce: kargoVerisi.ilce,
        postaKodu: kargoVerisi.postaKodu,
        ulke: kargoVerisi.ulke,
        telefon: kargoVerisi.telefon,
        varsayilan: false,
      },
      odemeYontemi:
        odemeVerisi.yontem === 'kart'
          ? 'Kart (Sonu **** ile biten)'
          : odemeVerisi.yontem === 'paypal'
          ? 'PayPal'
          : 'Apple Pay',
      siparisTarihi: new Date().toISOString(),
    };

    if (user?.id) {
      addOrder(yeniSiparis);
    }

    clearCart();
    setLoading(false);
    setSiparisTamamlandi(true);
    showToast('Siparişiniz başarıyla alındı!', 'success');
  };

  if (items.length === 0 && !siparisTamamlandi) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="h-24 w-24 text-muted-foreground/50 mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-2">Sepetiniz Boş</h1>
          <p className="text-muted-foreground mb-6">
            Sepetinizde ürün bulunmuyor. Alışverişe devam etmek için ürünlerimize göz atın.
          </p>
          <Button onClick={() => router.push('/products')}>
            Alışverişe Devam Et
          </Button>
        </div>
      </div>
    );
  }

  if (siparisTamamlandi) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles className="h-24 w-24 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Siparişiniz Alındı!</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Teşekkür ederiz! Siparişiniz başarıyla alındı ve işleniyor. Sipariş detayları e-posta adresinize gönderilecektir.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => router.push('/orders')}>Siparişlerim</Button>
            <Button variant="outline" onClick={() => router.push('/products')}>Alışverişe Devam Et</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sol Taraf - Adımlar ve Form */}
        <div className="lg:w-2/3">
          {/* Adım Başlıkları */}
          <div className="flex items-center justify-between mb-8">
            {adimlar.map((step, index) => (
              <div key={step.id} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-2 ${index > adimlar.findIndex((s) => s.id === currentStep) ? 'opacity-50' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step.id === currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                  >
                    <step.icon className="h-4 w-4" />
                  </div>
                  <span className="hidden md:inline font-medium">
                    {step.label}
                  </span>
                </div>
                {index < adimlar.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>

          {/* Form İçeriği */}
          <AnimatePresence mode="wait">
            {currentStep === 'kargo' && (
              <motion.div
                key="kargo"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h2 className="text-2xl font-bold mb-6">Kargo Bilgileri</h2>
                <form onSubmit={handleKargoSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">E-posta Adresi</Label>
                      <Input
                        id="email"
                        type="email"
                        value={kargoVerisi.email}
                        onChange={(e) => setKargoVerisi({ ...kargoVerisi, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="telefon">Telefon Numarası</Label>
                      <Input
                        id="telefon"
                        type="tel"
                        value={kargoVerisi.telefon}
                        onChange={(e) => setKargoVerisi({ ...kargoVerisi, telefon: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="tamAd">Tam Ad</Label>
                    <Input
                      id="tamAd"
                      value={kargoVerisi.tamAd}
                      onChange={(e) => setKargoVerisi({ ...kargoVerisi, tamAd: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="adres">Adres</Label>
                    <Input
                      id="adres"
                      value={kargoVerisi.adres}
                      onChange={(e) => setKargoVerisi({ ...kargoVerisi, adres: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="sehir">Şehir</Label>
                      <Input
                        id="sehir"
                        value={kargoVerisi.sehir}
                        onChange={(e) => setKargoVerisi({ ...kargoVerisi, sehir: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="ilce">İlçe</Label>
                      <Input
                        id="ilce"
                        value={kargoVerisi.ilce}
                        onChange={(e) => setKargoVerisi({ ...kargoVerisi, ilce: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postaKodu">Posta Kodu</Label>
                      <Input
                        id="postaKodu"
                        value={kargoVerisi.postaKodu}
                        onChange={(e) => setKargoVerisi({ ...kargoVerisi, postaKodu: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="ulke">Ülke</Label>
                    <Input
                      id="ulke"
                      value={kargoVerisi.ulke}
                      onChange={(e) => setKargoVerisi({ ...kargoVerisi, ulke: e.target.value })}
                      required
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="adresKaydet"
                      checked={kargoVerisi.adresKaydet}
                      onCheckedChange={(checked) => setKargoVerisi({ ...kargoVerisi, adresKaydet: Boolean(checked) })}
                    />
                    <Label htmlFor="adresKaydet">Adresimi kaydet</Label>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <Button type="button" variant="outline" onClick={() => router.push('/cart')}>
                      <ChevronLeft className="mr-2 h-4 w-4" /> Sepete Dön
                    </Button>
                    <Button type="submit">
                      Ödeme Bilgilerine Devam Et <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {currentStep === 'odeme' && (
              <motion.div
                key="odeme"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h2 className="text-2xl font-bold mb-6">Ödeme Bilgileri</h2>
                <RadioGroup
                  value={odemeVerisi.yontem}
                  onValueChange={(value) => setOdemeVerisi({ ...odemeVerisi, yontem: value as 'kart' | 'paypal' | 'applepay' })}
                  className="space-y-2 mb-6"
                >
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="kart" id="kart" />
                    <Label htmlFor="kart">Kredi/Banka Kartı</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="paypal" id="paypal" />
