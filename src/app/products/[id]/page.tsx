'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/mock-data';
import { useCartStore } from '@/lib/store/cart-store';
import { useWishlistStore } from '@/lib/store/wishlist-store';
import { useUIStore } from '@/lib/store/ui-store';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Heart,
  Share2,
  Plus,
  Minus,
  Star,
  ChevronLeft,
  ChevronRight,
  Eye,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Modal } from '@/components/Modal';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [showAiDescription, setShowAiDescription] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);
  const showToast = useUIStore((state) => state.showToast);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await api.getProductById(productId);
      if (data) {
        setProduct(data);
        setSelectedSize(data.sizes[0]);
        setSelectedColor(data.colors[0]);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product || !selectedSize || !selectedColor) return;

    setAddingToCart(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    addItem({
      productId: product.id,
      productTitle: product.title,
      image: product.images[selectedImage],
      price: product.price,
      quantity,
      variant: {
        size: selectedSize,
        color: selectedColor.name,
        colorHex: selectedColor.hex,
      },
    });

    setAddingToCart(false);
    showToast('Added to cart!', 'success');
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    toggleWishlist(product.id);
    showToast(
      isInWishlist(product.id) ? 'Removed from wishlist' : 'Added to wishlist',
      'success'
    );
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= (product?.stockCount || 10)) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="aspect-[3/4] bg-muted animate-pulse rounded-lg" />
          <div className="space-y-4">
            <div className="h-8 bg-muted animate-pulse rounded" />
            <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
            <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
            <div className="h-12 bg-muted animate-pulse rounded mt-8" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Button onClick={() => router.push('/products')}>Back to Products</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-foreground">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted"
          >
            <Image
              src={product.images[selectedImage]}
              alt={product.title}
              fill
              className="object-cover cursor-zoom-in"
              onClick={() => setShowLightbox(true)}
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized
            />

            {/* Image Navigation */}
            <div className="absolute inset-0 flex items-center justify-between opacity-0 hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2"
                onClick={() =>
                  setSelectedImage(
                    selectedImage === 0
                      ? product.images.length - 1
                      : selectedImage - 1
                  )
                }
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2"
                onClick={() =>
                  setSelectedImage(
                    selectedImage === product.images.length - 1
                      ? 0
                      : selectedImage + 1
                  )
                }
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <Badge className="bg-primary text-primary-foreground">
                  New
                </Badge>
              )}
              {product.isSale && product.discount && (
                <Badge className="bg-destructive text-destructive-foreground">
                  -{product.discount}%
                </Badge>
              )}
            </div>
          </motion.div>

          {/* Thumbnail Gallery */}
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
                  selectedImage === index ? 'border-primary' : 'border-transparent'
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                  unoptimized
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Title & Rating */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <Badge variant="destructive">-{product.discount}% OFF</Badge>
              </>
            )}
          </div>

          {/* Description */}
          <div className="space-y-3">
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {product.aiEnhancedDescription && (
              <div>
                <button
                  onClick={() => setShowAiDescription(!showAiDescription)}
                  className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium"
                >
                  <Sparkles className="h-4 w-4" />
                  {showAiDescription ? 'Gizle' : 'Göster'} AI ile Geliştirilmiş Açıklama
                </button>

                <AnimatePresence>
                  {showAiDescription && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="h-4 w-4 text-primary" />
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            AI Enhanced
                          </Badge>
                        </div>
                        <p className="text-sm">{product.aiEnhancedDescription}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          <Separator />

          {/* Variant Selectors */}
          <div className="space-y-4">
            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium">Size</label>
                <button className="text-sm text-primary hover:underline">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size: string) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? 'default' : 'outline'}
                    onClick={() => setSelectedSize(size)}
                    className="min-w-[60px]"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div>
              <label className="font-medium mb-2 block">Color</label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color: any) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor?.name === color.name
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor?.name === color.name && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-white/80" />
                      </div>
                    )}
                  </button>
                ))}
                {selectedColor && (
                  <span className="text-sm text-muted-foreground self-center">
                    {selectedColor.name}
                  </span>
                )}
              </div>
            </div>

            {/* Stock Indicator */}
            {!product.inStock ? (
              <Badge variant="destructive">Out of Stock</Badge>
            ) : product.stockCount < 5 ? (
              <Badge variant="outline" className="text-orange-600 border-orange-600">
                Only {product.stockCount} left in stock
              </Badge>
            ) : (
              <Badge variant="outline" className="text-green-600 border-green-600">
                In Stock
              </Badge>
            )}
          </div>

          <Separator />

          {/* Quantity & Actions */}
          <div className="space-y-4">
            {/* Quantity Selector */}
            <div>
              <label className="font-medium mb-2 block">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-16 text-center text-lg font-medium">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= (product?.stockCount || 10)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                className="flex-1"
                size="lg"
                disabled={!product.inStock || addingToCart}
                onClick={handleAddToCart}
              >
                {addingToCart ? (
                  'Adding...'
                ) : (
                  <>
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Sepete Ekle
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={handleWishlistToggle}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isInWishlist(product.id)
                      ? 'fill-destructive text-destructive'
                      : ''
                  }`}
                />
              </Button>

              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <Button
              variant="outline"
              className="w-full"
              disabled={!product.inStock}
              onClick={() => {
                handleAddToCart();
                router.push('/checkout');
              }}
            >
              Hemen Satın Al
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="h-4 w-4" />
              <span>50 TL üzeri ücretsiz kargo</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4" />
              <span>Güvenli ödeme</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <RotateCcw className="h-4 w-4" />
              <span>30 gün iade</span>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="description" className="mt-8">
            <TabsList>
              <TabsTrigger value="description">Açıklama</TabsTrigger>
              <TabsTrigger value="reviews">Yorumlar</TabsTrigger>
              <TabsTrigger value="shipping">Kargo</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-4">
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
              {product.features && (
                <ul className="mt-4 space-y-2">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{product.rating}</div>
                    <div className="flex justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {product.reviewCount} reviews
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-2">
                        <span className="text-sm w-3">{stars}</span>
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400"
                            style={{
                              width: `${Math.random() * 50 + 10}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline">Write a Review</Button>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Shipping Information</h4>
                    <p className="text-sm text-muted-foreground">
                      Free standard shipping on orders over $50. Express shipping
                      available for $10. Next day delivery for $20.
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <RotateCcw className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Return Policy</h4>
                    <p className="text-sm text-muted-foreground">
                      30-day return policy. Items must be unused and in original
                      packaging.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Modal isOpen={showLightbox} onClose={() => setShowLightbox(false)}>
        <div className="relative">
          <Image
            src={product.images[selectedImage]}
            alt={product.title}
            width={800}
            height={1067}
            className="max-h-[80vh] w-auto object-contain"
            unoptimized
          />
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </Modal>
    </div>
  );
}
