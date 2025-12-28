'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const footerLinks = {
    about: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Story', href: '/about#story' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' }
    ],
    shop: [
      { label: 'New Arrivals', href: '/products?sort=newest' },
      { label: 'Best Sellers', href: '/products?sort=bestselling' },
      { label: 'Sale', href: '/products?sale=true' },
      { label: 'Gift Cards', href: '/gift-cards' }
    ],
    support: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQs', href: '/faq' },
      { label: 'Shipping Info', href: '/shipping' },
      { label: 'Returns', href: '/returns' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Accessibility', href: '/accessibility' }
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
      {/* Newsletter Section */}
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-2 text-2xl font-bold">
              Join Our Newsletter
            </h2>
            <p className="mb-6 text-muted-foreground">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>
            <div className="flex gap-2 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button>Subscribe</Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Column */}
          <div className="space-y-4">
            <h3 className="font-semibold">About</h3>
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

          {/* Shop Column */}
          <div className="space-y-4">
            <h3 className="font-semibold">Shop</h3>
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

          {/* Support Column */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
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

          {/* Legal Column */}
          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
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

        {/* Social Links & Payment Methods */}
        <Separator className="my-8" />
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Social Links */}
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

          {/* Payment Methods */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>We Accept:</span>
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

        {/* Copyright */}
        <Separator className="my-8" />
        <div className="flex flex-col gap-4 text-center text-sm text-muted-foreground md:flex-row md:justify-between md:text-left">
          <p>&copy; {new Date().getFullYear()} ShopAI. All rights reserved.</p>
          <div className="flex gap-4 justify-center md:justify-start">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
