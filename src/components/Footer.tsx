'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const footerLinks = {
    about: [
      { label: 'Hakkımızda', href: '/about' },
      { label: 'Hikayemiz', href: '/about#story' },
      { label: 'Kariyer', href: '/careers' },
      { label: 'Blog', href: '/blog' }
    ],
    shop: [
      { label: 'Yeni Gelenler', href: '/products?sort=newest' },
      { label: 'En Çok Satanlar', href: '/products?sort=bestselling' },
      { label: 'İndirim', href: '/products?sale=true' },
      { label: 'Hediye Kartları', href: '/gift-cards' }
    ],
    support: [
      { label: 'İletişim', href: '/contact' },
      { label: 'Sıkça Sorulan Sorular', href: '/faq' },
      { label: 'Kargo Bilgisi', href: '/shipping' },
      { label: 'İadeler', href: '/returns' }
    ],
    legal: [
      { label: 'Gizlilik Politikası', href: '/privacy' },
      { label: 'Hizmet Şartları', href: '/terms' },
      { label: 'Çerez Politikası', href: '/cookies' },
      { label: 'Erişilebilirlik', href: '/accessibility' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-muted/50">
      {/* Bülten Bölümü */}
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-2 text-2xl font-bold">
              Bültenimize Abone Olun
            </h2>
            <p className="mb-6 text-muted-foreground">
              Özel fırsatlar, yeni ürünler ve keşif haberlerinden haberdar olun.
            </p>
            <div className="flex gap-2 sm:flex-row">
              <Input
                type="email"
                placeholder="E-posta adresinizi"
                className="flex-1"
              />
              <Button>Abone Ol</Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Abone olarak Gizlilik Politikasını kabul ediyorsunuz.
            </p>
          </div>
        </div>
      </div>

      {/* Ana Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Hakkımızda Bölümü */}
          <div className="space-y-4">
            <h3 className="font-semibold">Hakkımızda</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mağaza Bölümü */}
          <div className="space-y-4">
            <h3 className="font-semibold">Mağaza</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destek Bölümü */}
          <div className="space-y-4">
            <h3 className="font-semibold">Destek</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Yasal Bölümü */}
          <div className="space-y-4">
            <h3 className="font-semibold">Yasal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sosyal Medya Linkleri ve Ödeme Yöntemleri */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Sosyal Medya Linkleri */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="rounded-full bg-background p-2 transition-all hover:scale-110 hover:bg-primary hover:text-primary-foreground"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>

          {/* Ödeme Yöntemleri */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Kabul Ettiğimiz:</span>
            <div className="flex gap-2">
              <div className="flex h-8 w-12 items-center justify-center rounded border bg-background font-bold">
                Visa
              </div>
              <div className="flex h-8 w-12 items-center justify-center rounded border bg-background font-bold">
                MC
              </div>
              <div className="flex h-8 w-12 items-center justify-center rounded border bg-background font-bold">
                AmEx
              </div>
              <div className="flex h-8 w-12 items-center justify-center rounded border bg-background font-bold">
                PP
              </div>
            </div>
          </div>
        </div>

        {/* Telif Hakkı */}
        <div className="flex flex-col gap-4 text-center text-sm text-muted-foreground md:flex-row md:justify-between md:text-left">
          <p>&copy; {new Date().getFullYear()} ShopAI. Tüm hakları saklıdır.</p>
          <div className="flex gap-4 justify-center md:justify-start">
            <Link href="/privacy" className="hover:text-foreground">
              Gizlilik Politikası
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Hizmet Şartları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
