"use client";

import { Product } from '@/lib/mock-data';
import { useCartStore } from '@/lib/store/cart-store';
import { useWishlistStore } from '@/lib/store/wishlist-store';
import { useUIStore } from '@/lib/store/ui-store';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye, Star, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);
  const openQuickView = useUIStore((state) => state.openQuickView);
  const showToast = useUIStore((state) => state.showToast);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      productId: product.id,
      productTitle: product.title,
      image: product.images[0],
      price: product.originalPrice ? product.originalPrice : product.price,
      quantity: 1,
      variant: {
        size: product.sizes[0],
        color: product.colors[0].name,
        colorHex: product.colors[0].hex
      }
    });
    
    showToast('Ürün sepete eklendi!', 'success');
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    showToast(
      isInWishlist(product.id)
        ? 'İstek listesinden çıkarıldı'
        : 'İstek listesine eklendi',
      'success'
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all duration-300 hover:shadow-lg">
          {/* Görsel */}
          <div className="relative aspect-[3/4] overflow-hidden bg-muted">
            {!imageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-muted" />
            )}
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              onLoad={() => setImageLoaded(true)}
              unoptimized
            />

            {/* Etiketler */}
            <div className="absolute left-3 top-3 flex flex-col gap-2">
              {product.isNew && (
                <Badge className="bg-primary text-primary-foreground">
                  Yeni
                </Badge>
              )}
              {product.isSale && product.discount && (
                <Badge className="bg-destructive text-destructive-foreground">
                  -{product.discount}%
                </Badge>
              )}
              {product.isTrending && (
                <Badge
                  variant="outline"
                  className="border-primary bg-primary/10 text-primary"
                >
                  <Zap className="mr-1 h-3 w-3" />
                  Trend
                </Badge>
              )}
            </div>

            {/* Hızlı İşlemler */}
            <div className="absolute inset-x-0 bottom-0 translate-y-full transform bg-gradient-to-t from-black/60 via-black/40 to-transparent p-4 pt-16 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="flex justify-center gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-10 w-10 rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    openQuickView(product.id);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-10 w-10 rounded-full"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* İstek Listesi Butonu */}
            <button
              onClick={handleWishlistToggle}
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 p-2 shadow-md transition-all hover:scale-110 hover:bg-white"
            >
              <Heart
                className={`h-5 w-5 transition-colors ${
                  isInWishlist(product.id)
                    ? 'fill-destructive text-destructive'
                    : 'text-foreground'
                }`}
              />
            </button>

            {/* Stokta Yok Etiketi */}
            {!product.inStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <Badge className="bg-white text-black text-sm font-semibold">
                  Stokta Yok
                </Badge>
              </div>
            )}
          </div>

          {/* İçerik */}
          <div className="space-y-2 p-4">
            {/* Kategori */}
            <p className="text-xs font-medium text-muted-foreground">
              {product.category}
            </p>

            {/* Başlık */}
            <h3 className="line-clamp-2 font-semibold text-sm transition-colors group-hover:text-primary">
              {product.title}
            </h3>

            {/* Puan */}
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-muted text-muted'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>

            {/* Fiyat */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">
                {product.price.toFixed(2)} ₺
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-muted-foreground line-through">
                    {product.originalPrice.toFixed(2)} ₺
                  </span>
                </>
              )}
            </div>

            {/* Yapay Zeka Etiketi */}
            {product.aiEnhancedDescription && (
              <Badge
                variant="outline"
                className="w-fit border-primary/50 bg-primary/5 text-xs text-primary"
              >
                Yapay Zeka Önerisi
              </Badge>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
