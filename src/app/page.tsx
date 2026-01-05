'use client';

import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown, ArrowRight, Sparkles, ShoppingBag, Zap } from 'lucide-react';
import { api, categories, products } from '@/lib/mock-data';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRef } from 'react';
import { BannerModule } from '@/components/BannerModule';

// Typing Effect Component
function TypingEffect({ text, className = '' }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function HomePage() {
  const [trendingProducts, setTrendingProducts] = useState(products.slice(0, 8));
  const [aiRecommendedProducts, setAiRecommendedProducts] = useState(products.slice(4, 12));
  const [loadingMore, setLoadingMore] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // Refs for scroll animations
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const trendingRef = useRef(null);
  const aiRef = useRef(null);
  const newsletterRef = useRef(null);

  const heroInView = useInView(heroRef);
  const categoriesInView = useInView(categoriesRef);
  const trendingInView = useInView(trendingRef);
  const aiInView = useInView(aiRef);
  const newsletterInView = useInView(newsletterRef);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const moreProducts = products.slice(8, 12);
    setTrendingProducts(prev => [...prev, ...moreProducts]);
    setLoadingMore(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(135deg, rgba(255,182,193,0.3) 0%, rgba(255,218,185,0.3) 50%, rgba(221,160,221,0.3) 100%)',
              'linear-gradient(135deg, rgba(255,218,185,0.3) 0%, rgba(221,160,221,0.3) 50%, rgba(173,216,230,0.3) 100%)',
              'linear-gradient(135deg, rgba(221,160,221,0.3) 0%, rgba(173,216,230,0.3) 50%, rgba(255,182,193,0.3) 100%)',
              'linear-gradient(135deg, rgba(255,182,193,0.3) 0%, rgba(255,218,185,0.3) 50%, rgba(221,160,221,0.3) 100%)',
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Sparkles className="mr-2 h-4 w-4" />
              Moda Alışveriş
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <TypingEffect text="Stilinizi Keşfedin" className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60" />
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8"
            >
              En trend modayı keşfedin, kişisel tarzınızı bulun
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="/products">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Hemen Alışveriş Yap
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="h-8 w-8 text-muted-foreground" />
          </motion.div>
        )}
      </section>

      {/* Banner Modülü */}
      <section className="w-full">
        <BannerModule
          banners={[
            {
              id: 'banner-1',
              title: 'Yaz Kolleksiyonu',
              subtitle: 'Yeni sezon trendleri',
              imageUrl: '/banner1.jpg',
              ctaText: 'Keşfet',
              ctaUrl: '/products',
              category: 'Yaz',
              priority: 1,
              isActive: true,
              createdAt: new Date(),
            },
            {
              id: 'banner-2',
              title: 'İndirimler Başladı',
              subtitle: 'Tüm ürünlerde %50 indirim',
              imageUrl: '/banner1.jpg',
              ctaText: 'Satın Al',
              ctaUrl: '/products?sale=true',
              category: 'İndirim',
              priority: 2,
              isActive: true,
              createdAt: new Date(),
            },
          ]}
          autoPlay={true}
          autoPlayInterval={6000}
          showControls={true}
          showIndicators={true}
          height="lg"
        />
      </section>

      {/* Featured Categories */}
      <section ref={categoriesRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Kategoriler</h2>
            <p className="text-muted-foreground text-lg">
              En sevdiğiniz kategorileri keşfedin
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={categoriesInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link href={`/products?category=${category.slug}`}>
                  <div className="group relative aspect-[4/3] overflow-hidden rounded-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                    <div className="relative h-full w-full flex flex-col items-center justify-center p-6">
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {category.productCount} Ürün
                      </p>
                      <Button variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        Keşfet
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase - Trending Now */}
      <section ref={trendingRef} className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={trendingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-primary" />
                <Badge variant="secondary">Popüler</Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Trend Ürünler</h2>
              <p className="text-muted-foreground text-lg mt-2">
                En çok satan ve trend ürünler
              </p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0" asChild>
              <Link href="/products">Tüm Ürünleri Gör</Link>
            </Button>
          </motion.div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['Tümü', 'Giyim', 'Ayakkabı', 'Aksesuar', 'İndirim'].map((filter) => (
              <Button
                key={filter}
                variant={filter === 'Tümü' ? 'default' : 'outline'}
                size="sm"
              >
                {filter}
              </Button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {trendingProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          {/* Load More Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={trendingInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              variant="outline"
              onClick={handleLoadMore}
              disabled={loadingMore}
            >
              {loadingMore ? 'Yükleniyor...' : 'Daha Fazla Ürün'}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* AI Recommendations Section */}
      <section ref={aiRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={aiInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Önerilenler
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Size Özel Öneriler
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              En popüler ve trend ürünleri keşfedin
            </p>
          </motion.div>

          {/* Horizontal Scrollable Carousel */}
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
              {aiRecommendedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={aiInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex-shrink-0 w-72 snap-start"
                >
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={aiInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center mt-12"
          >
            <Button size="lg" asChild>
              <Link href="/products">
                Daha Fazla Ürün Keşfedin
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section ref={newsletterRef} className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={newsletterInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="rounded-2xl border bg-background/50 backdrop-blur-sm p-8 md:p-12 text-center shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                %10 İndirim Kazanın
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Yeni ürünler, kampanyalar ve moda ipuçları için bültenimize abone olun
              </p>

              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="E-posta adresinizi girin"
                  className="flex-1"
                  required
                />
                <Button type="submit" size="lg" className="px-8">
                  Abone Ol
                </Button>
              </form>

              <p className="text-xs text-muted-foreground mt-4">
                Kampanyalarımızdan haberdar olmak için abone olabilirsiniz.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
