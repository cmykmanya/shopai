'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/mock-data';
import { useUIStore } from '@/lib/store/ui-store';
import { ProductCard } from '@/components/ProductCard';
import { motion } from 'framer-motion';
import { Search, Filter, LayoutGrid, LayoutList, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslations } from 'next-intl';

interface ProductsPageProps {
  searchParams: {
    category?: string;
    search?: string;
    sort?: string;
  };
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const t = useTranslations('products');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.search || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.category || '');
  const [sortOption, setSortOption] = useState(searchParams.sort || 'featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const openQuickView = useUIStore((state) => state.openQuickView);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await api.getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    setSearchQuery(searchParams.search || '');
    setSelectedCategory(searchParams.category || '');
    setSortOption(searchParams.sort || 'featured');
  }, [searchParams]);

  const categories = [
    { id: '', name: t('allCategories') },
    { id: 'electronics', name: t('electronics') },
    { id: 'clothing', name: t('clothing') },
    { id: 'home', name: t('home') },
    { id: 'beauty', name: t('beauty') },
  ];

  const sortOptions = [
    { id: 'featured', name: t('featured') },
    { id: 'price-low-high', name: t('priceLowHigh') },
    { id: 'price-high-low', name: t('priceHighLow') },
    { id: 'newest', name: t('newest') },
    { id: 'rating', name: t('rating') },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    const matchesSearch = searchQuery
      ? product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const categoryParam = searchParams.category;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">
          {categoryParam ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1) : t('allProducts')}
        </h1>
        <p className="text-muted-foreground">
          {t('discoverOurCollection')}
        </p>
      </motion.div>

      {/* Search and Sort Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder={t('searchProducts')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t('sortBy')} />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <LayoutList className="h-4 w-4" />
          </Button>
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <Filter className="mr-2 h-4 w-4" />
                {t('filters')}
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>{t('filters')}</SheetTitle>
              </SheetHeader>
              <div className="py-4 space-y-4">
                <div>
                  <h3 className="font-medium mb-2">{t('category')}</h3>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectCategory')} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Filters (Desktop) */}
      <div className="hidden md:flex gap-6 mb-8">
        <div>
          <h3 className="font-medium mb-2">{t('category')}</h3>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t('selectCategory')} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="aspect-[3/4] rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : sortedProducts.length > 0 ? (
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
          {sortedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">{t('noProductsFound')}</h2>
          <p className="text-muted-foreground mb-4">{t('tryDifferentSearch')}</p>
          <Button onClick={() => {
            setSearchQuery('');
            setSelectedCategory('');
          }}>
            {t('clearFilters')}
          </Button>
        </div>
      )}
    </div>
  );
