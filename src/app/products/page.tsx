"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, categories } from '@/lib/mock-data';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LayoutGrid,
  List,
  SlidersHorizontal,
  X,
  ChevronDown,
  Star,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NextSeo } from 'next-seo';

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const sortParam = searchParams.get('sort');

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [loading, setLoading] = useState(false);

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortValue, setSortValue] = useState(sortParam || 'relevance');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Set initial category from URL
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [categoryParam]);

  // Get unique brands, sizes, colors
  const uniqueBrands = Array.from(new Set(products.map(p => p.brand))).slice(0, 10);
  const uniqueSizes = Array.from(new Set(products.flatMap(p => p.sizes)));
  const uniqueColors = Array.from(new Set(products.flatMap(p => p.colors.map(c => c.name))));

  // Apply filters
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let result = [...products];

      // Category filter
      if (selectedCategories.length > 0) {
        result = result.filter(p =>
          selectedCategories.includes(p.category) ||
          selectedCategories.includes(p.subcategory)
        );
      }

      // Price filter
      result = result.filter(
        p => p.price >= priceRange[0] && p.price <= priceRange[1]
      );

      // Brand filter
      if (selectedBrands.length > 0) {
        result = result.filter(p => selectedBrands.includes(p.brand));
      }

      // Size filter
      if (selectedSizes.length > 0) {
        result = result.filter(p =>
          p.sizes.some(s => selectedSizes.includes(s))
        );
      }

      // Color filter
      if (selectedColors.length > 0) {
        result = result.filter(p =>
          p.colors.some(c => selectedColors.includes(c.name))
        );
      }

      // Rating filter
      if (minRating > 0) {
        result = result.filter(p => p.rating >= minRating);
      }

      // Stock filter
      if (inStockOnly) {
        result = result.filter(p => p.inStock);
      }

      // Sort
      switch (sortValue) {
        case 'price-low':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
          break;
        case 'bestselling':
          result.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
        default:
          // Relevance - trending first
          result.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
      }

      setFilteredProducts(result);
      setCurrentPage(1);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [
    selectedCategories,
    priceRange,
    selectedBrands,
    selectedSizes,
    selectedColors,
    minRating,
    inStockOnly,
    sortValue,
  ]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 500]);
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setMinRating(0);
    setInStockOnly(false);
  };

  const activeFilterCount =
    selectedCategories.length +
    selectedBrands.length +
    selectedSizes.length +
    selectedColors.length +
    (minRating > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Kategoriler */}
      <div>
        <h3 className="font-semibold mb-3">Kategoriler</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${cat.id}`}
                checked={selectedCategories.includes(cat.name)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, cat.name]);
                  } else {
                    setSelectedCategories(
                      selectedCategories.filter((c) => c !== cat.name)
                    );
                  }
                }}
              />
              <Label htmlFor={`cat-${cat.id}`} className="text-sm">
                {cat.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Fiyat Aralığı */}
      <div>
        <h3 className="font-semibold mb-3">Fiyat Aralığı</h3>
        <div className="space-y-3">
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            max={500}
            step={10}
          />
          <div className="flex items-center justify-between text-sm">
            <span>{priceRange[0]} ₺</span>
            <span>{priceRange[1]} ₺</span>
          </div>
        </div>
      </div>

      {/* Markalar */}
      <div>
        <h3 className="font-semibold mb-3">Markalar</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {uniqueBrands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedBrands([...selectedBrands, brand]);
                  } else {
                    setSelectedBrands(selectedBrands.filter((b) => b !== brand));
                  }
                }}
              />
              <Label htmlFor={`brand-${brand}`} className="text-sm">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Bedenler */}
      <div>
        <h3 className="font-semibold mb-3">Bedenler</h3>
        <div className="flex flex-wrap gap-2">
          {uniqueSizes.map((size) => (
            <Button
              key={size}
              variant={selectedSizes.includes(size) ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                if (selectedSizes.includes(size)) {
                  setSelectedSizes(selectedSizes.filter((s) => s !== size));
                } else {
                  setSelectedSizes([...selectedSizes, size]);
                }
              }}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Değerlendirme */}
      <div>
        <h3 className="font-semibold mb-3">Minimum Değerlendirme</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <div
              key={rating}
              className={`flex items-center gap-2 cursor-pointer p-2 rounded-md transition-colors ${
                minRating === rating ? 'bg-muted' : 'hover:bg-muted/50'
              }`}
              onClick={() => setMinRating(minRating === rating ? 0 : rating)}
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">& Üzeri</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stok Durumu */}
      <div>
        <h3 className="font-semibold mb-3">Stok Durumu</h3>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="stock"
            checked={inStockOnly}
            onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
          />
          <Label htmlFor="stock" className="text-sm">
            Sadece Stokta Olanlar
          </Label>
        </div>
      </div>

      {/* Filtreleri Temizle */}
      {activeFilterCount > 0 && (
        <Button
          variant="outline"
          className="w-full"
          onClick={clearFilters}
        >
          Tüm Filtreleri Temizle
        </Button>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <NextSeo
        title={categoryParam ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)} - ShopAI` : "Tüm Ürünler - ShopAI"}
        description={categoryParam ? `${categoryParam} kategorisindeki en yeni ve trend ürünleri keşfedin.` : "ShopAI'de en yeni ve trend ürünleri keşfedin. Moda, aksesuar ve daha fazlası için kişiselleştirilmiş alışveriş deneyimi."}
        canonical={`https://shopai.com.tr/urunler${categoryParam ? `?kategori=${categoryParam}` : ''}`}
        openGraph={
          {
            url: `https://shopai.com.tr/urunler${categoryParam ? `?kategori=${categoryParam}` : ''}`,
            title: categoryParam ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)} - ShopAI` : "Tüm Ürünler - ShopAI",
            description: categoryParam ? `${categoryParam} kategorisindeki en yeni ve trend ürünleri keşfedin.` : "ShopAI'de en yeni ve trend ürünleri keşfedin. Moda, aksesuar ve daha fazlası için kişiselleştirilmiş alışveriş deneyimi.",
            images: [
              {
                url: "https://shopai.com.tr/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "ShopAI Ürünler",
              },
            ],
            site_name: "ShopAI",
          }
        }
      />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {categoryParam ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1) : 'Tüm Ürünler'}
        </h1>
        <p className="text-muted-foreground">
          {filteredProducts.length} ürün bulundu
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <FilterPanel />
          </div>
        </aside>

        {/* Mobile Filter Button */}
        <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="lg:hidden fixed bottom-4 left-4 z-40 rounded-full shadow-lg"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filtreler
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filtreler</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterPanel />
            </div>
          </SheetContent>
        </Sheet>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort & View Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Select value={sortValue} onValueChange={setSortValue}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sırala" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">İlgililik</SelectItem>
                  <SelectItem value="price-low">Fiyat: Düşükten Yükseğe</SelectItem>
                  <SelectItem value="price-high">Fiyat: Yüksekten Düşüğe</SelectItem>
                  <SelectItem value="newest">En Yeniler</SelectItem>
                  <SelectItem value="bestselling">Çok Satanlar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' :
