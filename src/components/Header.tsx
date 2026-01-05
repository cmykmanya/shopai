'use client';

import { useState, useEffect } from 'react';
import { MegaCategoryMenu } from '@/components/MegaCategoryMenu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Heart,
  User,
  Search,
  Menu,
  X,
  ShoppingBag
} from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';
import { useWishlistStore } from '@/lib/store/wishlist-store';
import { useUIStore } from '@/lib/store/ui-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CartDrawer } from '@/components/CartDrawer';

export function Header() {
  const pathname = usePathname();
  const itemCount = useCartStore((state) => state.itemCount);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);
  
  // Import categories data
  const { mockCategories } = require('@/data/categories');
  const categories = mockCategories;
  const { openCart, isMenuOpen, toggleMenu, isSearchOpen, toggleSearch } =
    useUIStore();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = pathname === '/';

  const navLinks = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/products', label: 'Mağaza' },
    { href: '/style-quiz', label: 'Stil Testi' },
    { href: '/account', label: 'Hesabım' }
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isHomePage && !isScrolled
            ? 'bg-transparent'
            : 'bg-background/95 backdrop-blur-md shadow-sm'
        }`}
      >
        <div className="container mx-auto px-4">
          {/* Üst Bar */}
          <div className="flex h-16 items-center justify-between">
            {/* Mobil Menü Butonu */}
            <Sheet open={isMenuOpen} onOpenChange={toggleMenu}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <nav className="mt-8 flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={toggleMenu}
                      className={`text-lg font-medium transition-colors ${
                        pathname === link.href
                          ? 'text-primary'
                          : 'text-foreground/80 hover:text-foreground'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">ShopAI</span>
            </Link>

            {/* Masaüstü için Mega Category Menu */}
            <div className="hidden lg:flex">
              <MegaCategoryMenu categories={categories} />
            </div>

            {/* Masaüstü Navigasyon */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'text-primary'
                      : 'text-foreground/80 hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Arama Butonu */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSearch}
              className="hidden md:flex"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Sağ İkonlar */}
            <div className="flex items-center space-x-2">
              {/* Favoriler */}
              <Link href="/account">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>

              {/* Sepet */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={openCart}
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-1 -top-1 h-5 w-5 flex items-center justify-center rounded-full p-0 text-xs"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Button>

              {/* Hesapım */}
              <Link href="/account">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobil Arama Çubuğu */}
          <div className="pb-4 lg:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Ürün ara..."
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Arama Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-8">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Ürün ara..."
                  className="h-14 pl-12 text-lg"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="mt-8">
                <p className="text-sm text-muted-foreground mb-4">Popüler aramalar:</p>
                <div className="flex flex-wrap gap-2">
                  {['Yaz Elbisesi', 'Spor Ayakkabısı', 'Denim Ceketi', 'Akıllı Saat'].map(
                    (term) => (
                      <Button
                        key={term}
                        variant="outline"
                        size="sm"
                        onClick={toggleSearch}
                        asChild
                      >
                        <Link href={`/search?q=${term.toLowerCase().replace(' ', '+')}`}>
                          {term}
                        </Link>
                      </Button>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sepet Çekmecesi */}
      <CartDrawer />
    </>
  );
}
