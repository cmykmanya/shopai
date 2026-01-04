'use client';

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
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
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

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-3">
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            max={500}
            step={10}
          />
          <div className="flex items-center justify-between text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold mb-3">Brands</h3>
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

      {/* Sizes */}
      <div>
        <h3 className="font-semibold mb-3">Sizes</h3>
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

      {/* Rating */}
      <div>
        <h3 className="font-semibold mb-3">Minimum Rating</h3>
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
              <span className="text-sm text-muted-foreground">& Up</span>
            </div>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="font-semibold mb-3">Availability</h3>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="stock"
            checked={inStockOnly}
            onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
          />
          <Label htmlFor="stock" className="text-sm">
            In Stock Only
          </Label>
        </div>
      </div>

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <Button
          variant="outline"
          className="w-full"
          onClick={clearFilters}
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {categoryParam ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1) : 'All Products'}
        </h1>
        <p className="text-muted-foreground">
          {filteredProducts.length} products found
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
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
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
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="bestselling">Best Selling</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
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
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategories.map((cat) => (
                <Badge key={cat} variant="secondary" className="gap-1">
                  {cat}
                  <button
                    onClick={() =>
                      setSelectedCategories(selectedCategories.filter((c) => c !== cat))
                    }
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {selectedBrands.map((brand) => (
                <Badge key={brand} variant="secondary" className="gap-1">
                  {brand}
                  <button
                    onClick={() =>
                      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
                    }
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] bg-muted animate-pulse rounded-lg"
                />
              ))}
            </div>
          ) : (
            <>
              {/* Products Grid/List */}
              {currentProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl font-semibold mb-2">No products found</p>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              ) : (
                <motion.div
                  layout
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
                      : 'space-y-4'
                  }
                >
                  <AnimatePresence>
                    {currentProducts.map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </Button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? 'default' : 'outline'}
                          size="icon"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      )
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronDown className="h-4 w-4 rotate-90" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
