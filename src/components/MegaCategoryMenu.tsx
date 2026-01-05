'use client';

import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export default function MegaCategoryMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative">
      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center space-x-2">
        {megaCategories.map((category) => (
          <div
            key={category.id}
            className="relative group"
            onMouseEnter={() => setActiveCategory(category.id)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <Button
              variant="ghost"
              className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors"
            >
              {category.name}
              <ChevronDown className="h-4 w-4" />
            </Button>

            {/* Mega Menu Dropdown */}
            <div
              className={`absolute top-full left-0 w-screen max-w-6xl bg-white shadow-lg border border-gray-200 rounded-lg py-6 px-8 transition-all duration-300 ease-in-out transform ${
                activeCategory === category.id
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
              style={{
                marginLeft: '-50vw',
                marginRight: '-50vw',
                maxWidth: '100vw',
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {category.subcategories.map((subcategory) => (
                  <div key={subcategory.id} className="group/sub">
                    <Link
                      href={`/products?category=${subcategory.slug}`}
                      className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={closeMenu}
                    >
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover/sub:text-primary transition-colors">
                        {subcategory.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Trend {subcategory.name} koleksiyonu
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          onClick={toggleMenu}
          className="flex items-center gap-2"
        >
          <Menu className="h-5 w-5" />
          Kategoriler
        </Button>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
            <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Kategoriler</h2>
                <Button variant="ghost" onClick={closeMenu}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="overflow-y-auto h-[calc(100%-64px)]">
                {megaCategories.map((category) => (
                  <div key={category.id} className="border-b">
                    <button
                      className="w-full text-left p-4 flex items-center justify-between font-medium hover:bg-gray-50"
                      onClick={() => setActiveCategory(
                        activeCategory === category.id ? null : category.id
                      )}
                    >
                      <span>{category.name}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${
                        activeCategory === category.id ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {activeCategory === category.id && (
                      <div className="bg-gray-50 py-2 pl-6">
                        {category.subcategories.map((subcategory) => (
                          <Link
                            key={subcategory.id}
                            href={`/products?category=${subcategory.slug}`}
                            className="block py-2 text-sm text-gray-700 hover:text-primary"
                            onClick={closeMenu}
                          >
                            {subcategory.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Mock data for mega categories
const megaCategories = [
  {
    id: 'men',
    name: 'Erkek',
    slug: 'men',
    image: '/api/placeholder/400/300',
    subcategories: [
      { id: 'men-tshirts', name: 'T-Shirt', slug: 'tshirts', categoryId: 'men', isActive: true },
      { id: 'men-shirts', name: 'Gömlek', slug: 'shirts', categoryId: 'men', isActive: true },
      { id: 'men-pants', name: 'Pantolon', slug: 'pants', categoryId: 'men', isActive: true },
      { id: 'men-jackets', name: 'Ceket', slug: 'jackets', categoryId: 'men', isActive: true },
      { id: 'men-shoes', name: 'Ayakkabı', slug: 'shoes', categoryId: 'men', isActive: true },
      { id: 'men-accessories', name: 'Aksesuar', slug: 'accessories', categoryId: 'men', isActive: true },
    ],
    isActive: true,
  },
  {
    id: 'women',
    name: 'Kadın',
    slug: 'women',
    image: '/api/placeholder/400/300',
    subcategories: [
      { id: 'women-tops', name: 'Üst', slug: 'tops', categoryId: 'women', isActive: true },
      { id: 'women-dresses', name: 'Elbise', slug: 'dresses', categoryId: 'women', isActive: true },
      { id: 'women-pants', name: 'Pantolon', slug: 'pants', categoryId: 'women', isActive: true },
      { id: 'women-skirts', name: 'Etek', slug: 'skirts', categoryId: 'women', isActive: true },
      { id: 'women-jackets', name: 'Ceket', slug: 'jackets', categoryId: 'women', isActive: true },
      { id: 'women-shoes', name: 'Ayakkabı', slug: 'shoes', categoryId: 'women', isActive: true },
      { id: 'women-bags', name: 'Çanta', slug: 'bags', categoryId: 'women', isActive: true },
    ],
    isActive: true,
  },
  {
    id: 'kids',
    name: 'Çocuk',
    slug: 'kids',
    image: '/api/placeholder/400/300',
    subcategories: [
      { id: 'kids-boys', name: 'Erkek Çocuk', slug: 'boys', categoryId: 'kids', isActive: true },
      { id: 'kids-girls', name: 'Kız Çocuk', slug: 'girls', categoryId: 'kids', isActive: true },
      { id: 'kids-baby', name: 'Bebek', slug: 'baby', categoryId: 'kids', isActive: true },
      { id: 'kids-shoes', name: 'Ayakkabı', slug: 'shoes', categoryId: 'kids', isActive: true },
      { id: 'kids-accessories', name: 'Aksesuar', slug: 'accessories', categoryId: 'kids', isActive: true },
    ],
    isActive: true,
  },
  {
    id: 'accessories',
    name: 'Aksesuar',
    slug: 'accessories',
    image: '/api/placeholder/400/300',
    subcategories: [
      { id: 'acc-bags', name: 'Çantalar', slug: 'bags', categoryId: 'accessories', isActive: true },
      { id: 'acc-jewelry', name: 'Takı', slug: 'jewelry', categoryId: 'accessories', isActive: true },
      { id: 'acc-watches', name: 'Saatler', slug: 'watches', categoryId: 'accessories', isActive: true },
      { id: 'acc-sunglasses', name: 'Gözlük', slug: 'sunglasses', categoryId: 'accessories', isActive: true },
      { id: 'acc-hats', name: 'Şapkalar', slug: 'hats', categoryId: 'accessories', isActive: true },
      { id: 'acc-belts', name: 'Kemerler', slug: 'belts', categoryId: 'accessories', isActive: true },
    ],
    isActive: true,
  },
  {
    id: 'shoes',
    name: 'Ayakkabı',
    slug: 'shoes',
    image: '/api/placeholder/400/300',
    subcategories: [
      { id: 'shoes-sneakers', name: 'Spor Ayakkabı', slug: 'sneakers', categoryId: 'shoes', isActive: true },
      { id: 'shoes-boots', name: 'Çizmeler', slug: 'boots', categoryId: 'shoes', isActive: true },
      { id: 'shoes-sandals', name: 'Terlik', slug: 'sandals', categoryId: 'shoes', isActive: true },
      { id: 'shoes-formal', name: 'Resmi Ayakkabı', slug: 'formal', categoryId: 'shoes', isActive: true },
      { id: 'shoes-sports', name: 'Spor Ayakkabı', slug: 'sports', categoryId: 'shoes', isActive: true },
    ],
    isActive: true,
  },
];