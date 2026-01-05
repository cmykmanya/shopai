// Mock categories data - should be replaced with API call
export const mockCategories = [
  {
    id: '1',
    name: 'Kadın',
    slug: 'women',
    subcategories: [
      { id: '1-1', name: 'Elbiseler', slug: 'dresses', categoryId: '1', featured: true },
      { id: '1-2', name: 'Gömlekler', slug: 'blouses', categoryId: '1' },
      { id: '1-3', name: 'Pantolonlar', slug: 'pants', categoryId: '1' },
    ]
  },
  {
    id: '2',
    name: 'Erkek',
    slug: 'men',
    subcategories: [
      { id: '2-1', name: 'Gömlekler', slug: 'shirts', categoryId: '2', featured: true },
      { id: '2-2', name: 'Pantolonlar', slug: 'pants', categoryId: '2' },
      { id: '2-3', name: 'Ayakkabılar', slug: 'shoes', categoryId: '2' },
    ]
  },
  {
    id: '3',
    name: 'Çocuk',
    slug: 'kids',
    subcategories: [
      { id: '3-1', name: 'Kız Çocuk', slug: 'girls', categoryId: '3', featured: true },
      { id: '3-2', name: 'Erkek Çocuk', slug: 'boys', categoryId: '3' },
      { id: '3-3', name: 'Bebek', slug: 'baby', categoryId: '3' },
    ]
  }
];

export type Category = typeof mockCategories[0];
export type Subcategory = {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  featured?: boolean;
};