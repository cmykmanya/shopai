'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description?: string;
  featured?: boolean;
  productsCount?: number;
}

interface MegaCategoryMenuProps {
  categories: Category[];
}

export function MegaCategoryMenu({ categories }: MegaCategoryMenuProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openSubcategory, setOpenSubcategory] = useState<string | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenSubcategory(null);
        setOpenCategory(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    if (openCategory === categoryId) {
      setOpenCategory(null);
      setOpenSubcategory(null);
    } else {
      setOpenCategory(categoryId);
      setOpenSubcategory(null);
    }
  };

  const handleSubcategoryClick = (subcategoryId: string) => {
    if (openSubcategory === subcategoryId) {
      setOpenSubcategory(null);
    } else {
      setOpenSubcategory(subcategoryId);
    }
  };

  return (
    <div className="relative">
      {/* Main Category Buttons */}
      <div className="flex items-center space-x-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            className={`group relative h-12 px-4 text-sm font-medium transition-colors ${
              openCategory === category.id
                ? 'text-primary bg-muted'
                : 'text-foreground hover:text-primary'
            }`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
            <ChevronDown
              className={`ml-1 h-4 w-4 transition-transform ${
                openCategory === category.id ? 'rotate-180' : ''
              }`}
            />
            
            {/* Dropdown Indicator */}
            {openCategory === category.id && (
              <motion.div
                layoutId="mega-menu-bg"
                className="absolute inset-0 rounded-md bg-muted"
                initial={false}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </Button>
        ))}
      </div>

      {/* Mega Menu */}
      <AnimatePresence>
        {openCategory && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full z-50 w-screen max-w-7xl rounded-lg border bg-background shadow-lg"
            style={{ marginTop: '-1px' }}
          >
            <div className="grid grid-cols-4 gap-8 p-8">
              {/* Category Info */}
              {(() => {
                const category = categories.find(c => c.id === openCategory);
                return (
                  <div className="col-span-1 space-y-4">
                    {category?.image && (
                      <div className="aspect-square overflow-hidden rounded-lg">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold">{category?.name}</h3>
                      {category?.description && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* Subcategories */}
              <div className="col-span-3 grid grid-cols-2 gap-6">
                {(() => {
                  const category = categories.find(c => c.id === openCategory);
                  if (!category) return null;

                  // Group subcategories by featured status
                  const featured = category.subcategories.filter(s => s.featured);
                  const regular = category.subcategories.filter(s => !s.featured);

                  return (
                    <>
                      {featured.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="font-medium text-primary">Öne Çıkanlar</h4>
                          {featured.map((subcategory) => (
                            <SubcategoryItem
                              key={subcategory.id}
                              subcategory={subcategory}
                              isOpen={openSubcategory === subcategory.id}
                              onToggle={() => handleSubcategoryClick(subcategory.id)}
                            />
                          ))}
                        </div>
                      )}
                      
                      <div className="space-y-4">
                        <h4 className="font-medium">Tüm Kategoriler</h4>
                        <ScrollArea className="h-64 pr-4">
                          {regular.map((subcategory) => (
                            <SubcategoryItem
                              key={subcategory.id}
                              subcategory={subcategory}
                              isOpen={openSubcategory === subcategory.id}
                              onToggle={() => handleSubcategoryClick(subcategory.id)}
                            />
                          ))}
                        </ScrollArea>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SubcategoryItem({
  subcategory,
  isOpen,
  onToggle,
}: {
  subcategory: Subcategory;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="space-y-2">
      <Button
        variant="ghost"
        className="w-full justify-between text-left font-normal hover:bg-transparent"
        onClick={onToggle}
      >
        <span className="flex items-center gap-2">
          {subcategory.name}
          {subcategory.productsCount && (
            <Badge variant="secondary" className="ml-2">
              {subcategory.productsCount}
            </Badge>
          )}
        </span>
        <ChevronRight
          className={`h-4 w-4 transition-transform ${
            isOpen ? 'rotate-90' : ''
          }`}
        />
      </Button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="ml-4 space-y-2 border-l-2 border-border pl-4"
          >
            {subcategory.description && (
              <p className="text-sm text-muted-foreground">
                {subcategory.description}
              </p>
            )}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href={`/products?category=${subcategory.slug}`}>
                  Ürünleri Gör
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={`/products?category=${subcategory.slug}&sort=featured`}>
                  Öne Çıkanlar
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}