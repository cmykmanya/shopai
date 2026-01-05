'use client';

// Bu sayfayı dinamik hale getir
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { api, categories } from '@/lib/mock-data';
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
interface ProductsPageProps {
  searchParams: {
    category?: string;
    search?: string;
    sort?: string;
  };
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('featured');
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
    // URL'deki parametreleri state'e uygula
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const search = urlParams.get('search');
    const sort = urlParams.get('sort');

    if (category) setSelectedCategory(category);
    if (search) setSearchQuery(search);
    if (sort) setSortOption(sort);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'featured':
      default:
        return 0;
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    window.location.search = params.toString();
  };

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(window.location.search);
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    window.location.search = params.toString();
  };

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(window.location.search);
    if (sort) {
      params.set('sort', sort);
    } else {
      params.delete('sort');
    }
    window.location.search = params.toString();
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSortOption('featured');
    window.location.search = '';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Ürünler</h1>
        <p className="text-muted-foreground">Size en uygun ürünleri keşfedin</p>
      </motion.div>

      {/* Filtreleme ve Arama */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="flex flex-col lg:flex-row gap-4 mb-8"
      >
        {/* Arama */}
        <div className="flex-1">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Ürün ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-12"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  const params = new URLSearchParams(window.location.search);
                  params.delete('search');
                  window.location.search = params.toString();
                }}
                className="absolute right-0 top-0 h-full px-2"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </form>
        </div>

        {/* Filtreler */}
        <div className="flex flex-wrap gap-2">
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <Filter className="mr-2 h-4 w-4" />
                Filtreler
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <SheetHeader>
                <SheetTitle>Filtreler</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Kategori</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.slug ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleCategoryChange(
                          selectedCategory === category.slug ? '' : category.slug
                        )}
                        className="w-full justify-start"
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Sıralama</h3>
                  <Select value={sortOption} onValueChange={handleSortChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sıralama seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Öne Çıkanlar</SelectItem>
                      <SelectItem value="price-low">Fiyat: Düşük → Yüksek</SelectItem>
                      <SelectItem value="price-high">Fiyat: Yüksek → Düşük</SelectItem>
                      <SelectItem value="newest">Yeniden Eskiye</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Görünüm</h3>
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                    >
                      <LayoutList className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button variant="outline" onClick={clearFilters} className="w-full">
                  <X className="mr-2 h-4 w-4" />
                  Filtreleri Temizle
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Kategori seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Kategoriler</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortOption} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sıralama seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Öne Çıkanlar</SelectItem>
              <SelectItem value="price-low">Fiyat: Düşük → Yüksek</SelectItem>
              <SelectItem value="price-high">Fiyat: Yüksek → Düşük</SelectItem>
              <SelectItem value="newest">Yeniden Eskiye</SelectItem>
            </SelectContent>
          </Select>

          <div className="hidden lg:flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <LayoutList className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Aktif Filtreler */}
      {(selectedCategory || searchQuery || sortOption !== 'featured') && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {selectedCategory && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Kategori: {categories.find(c => c.slug === selectedCategory)?.name}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleCategoryChange('')}
              />
            </Badge>
          )}
          {searchQuery && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Arama: "{searchQuery}"
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setSearchQuery('');
                  const params = new URLSearchParams(window.location.search);
                  params.delete('search');
                  window.location.search = params.toString();
                }}
              />
            </Badge>
          )}
          {sortOption !== 'featured' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Sıralama: {sortOption === 'price-low' ? 'Fiyat: Düşük → Yüksek' : 
                         sortOption === 'price-high' ? 'Fiyat: Yüksek → Düşük' : 
                         'Yeniden Eskiye'}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleSortChange('featured')}
              />
            </Badge>
          )}
        </motion.div>
      )}

      {/* Ürün Listesi */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <Skeleton key={index} className="h-96 w-full" />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          }`}>
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
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-xl font-semibold mb-2">Ürün Bulunamadı</h3>
            <p className="text-muted-foreground mb-6">
              Aradığınız kriterlere uygun ürün bulunamadı. Lütfen farklı filtreler deneyin.
            </p>
            <Button onClick={clearFilters} variant="outline">
              Tüm Filtreleri Temizle
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
