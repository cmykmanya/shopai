'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  ctaText?: string;
  ctaUrl?: string;
  category?: string;
  priority: number;
  isActive: boolean;
  createdAt: Date;
}

interface BannerModuleProps {
  banners: Banner[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  height?: 'sm' | 'md' | 'lg' | 'xl';
}

export function BannerModule({
  banners,
  autoPlay = true,
  autoPlayInterval = 5000,
  showControls = true,
  showIndicators = true,
  height = 'lg',
}: BannerModuleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isHovered, setIsHovered] = useState(false);

  const activeBanners = banners.filter(banner => banner.isActive);
  
  useEffect(() => {
    if (!isPlaying || activeBanners.length <= 1 || isHovered) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPlaying, autoPlayInterval, activeBanners.length, isHovered]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? activeBanners.length - 1 : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentBanner = activeBanners[currentIndex];

  if (activeBanners.length === 0) {
    return null;
  }

  const heightClasses = {
    sm: 'h-64',
    md: 'h-80',
    lg: 'h-96',
    xl: 'h-[28rem]',
  };

  return (
    <div
      className={`relative w-full overflow-hidden ${heightClasses[height]}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <motion.div
        key={currentBanner.id}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="absolute inset-0"
      >
        <img
          src={currentBanner.imageUrl}
          alt={currentBanner.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </motion.div>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-4xl text-white"
          >
            {currentBanner.category && (
              <Badge variant="secondary" className="mb-4 bg-white/20 backdrop-blur-sm">
                {currentBanner.category}
              </Badge>
            )}
            
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {currentBanner.title}
            </h1>
            
            {currentBanner.subtitle && (
              <p className="mb-8 text-lg text-white/90 md:text-xl">
                {currentBanner.subtitle}
              </p>
            )}

            {currentBanner.ctaText && currentBanner.ctaUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <a href={currentBanner.ctaUrl}>
                  <Button size="lg" className="bg-white text-black hover:bg-white/90">
                    {currentBanner.ctaText}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Navigation Controls */}
      {showControls && activeBanners.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50"
            onClick={prevSlide}
            aria-label="Previous banner"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50"
            onClick={nextSlide}
            aria-label="Next banner"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Auto-play Controls */}
      {showControls && activeBanners.length > 1 && (
        <div className="absolute bottom-4 left-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>
        </div>
      )}

      {/* Indicators */}
      {showIndicators && activeBanners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 space-x-2">
          {activeBanners.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {isPlaying && activeBanners.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0">
          <motion.div
            className="h-1 bg-white/30"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: autoPlayInterval / 1000, ease: 'linear' }}
            onAnimationComplete={() => {
              if (isPlaying && !isHovered) {
                nextSlide();
              }
            }}
          />
        </div>
      )}
    </div>
  );
}