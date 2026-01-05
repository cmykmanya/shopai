'use client';

import Image from 'next/image';
import { useState } from 'react';

interface BannerProps {
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  variant?: 'primary' | 'secondary';
}

export default function Banner({ 
  title, 
  description, 
  image, 
  ctaText, 
  ctaLink, 
  variant = 'primary' 
}: BannerProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className={`object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoadingComplete={() => setImageLoaded(true)}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={ctaLink}
              className={`px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                variant === 'primary'
                  ? 'bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl'
                  : 'bg-white text-gray-900 hover:bg-gray-100 border-2 border-white'
              }`}
            >
              {ctaText}
            </a>
            <a
              href="/products"
              className="px-8 py-3 rounded-full font-semibold text-sm border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Keşfet
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white border-opacity-20 rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-white border-opacity-20 rounded-full animate-bounce" />
      </div>
    </div>
  );
}

// Banner Module Component for Homepage
export function BannerModule() {
  const banners = [
    {
      title: "Yaz Koleksiyonu",
      description: "Yaz sezonunun en trend parçaları sizleri bekliyor. Hemen keşfedin!",
      image: "/banner1.jpg",
      ctaText: "Satın Al",
      ctaLink: "/products?category=women&subcategory=dresses",
      variant: "primary" as const
    },
    {
      title: "Sınırsız Stil",
      description: "Her tarz için doğru seçimler. Kişisel tarzınızı keşfedin.",
      image: "/banner1.jpg",
      ctaText: "Keşfet",
      ctaLink: "/products",
      variant: "secondary" as const
    },
    {
      title: "İndirimler Başladı",
      description: "Seçili ürünlerde %50'ye varan indirimler. Fırsatları kaçırmayın!",
      image: "/banner1.jpg",
      ctaText: "İndirimleri Gör",
      ctaLink: "/products?onSale=true",
      variant: "primary" as const
    }
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  return (
    <div className="w-full">
      <Banner {...banners[currentBanner]} />
      
      {/* Banner Controls */}
      <div className="container mx-auto px-6 mt-6 flex justify-center">
        <div className="flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentBanner
                  ? 'bg-primary scale-110'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => setCurrentBanner(index)}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}