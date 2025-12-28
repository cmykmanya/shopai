'use client';

import { useState, useEffect } from 'react';
import { products as mockProducts, categories } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  MoreVertical,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminProductsPage() {
  const pathname = usePathname();
  const [products, setProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    brand: '',
    inStock: true,
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      id: `prod-${Date.now()}`,
      ...formData,
      price: parseFloat(formData.price),
      slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
      description: 'Yeni ürün açıklaması',
      images: ['/api/placeholder/600/800'],
      rating: 0,
      reviewCount: 0,
      stockCount: 10,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [{ name: 'Default', hex: '#000000' }],
      tags: [],
      isNew: true,
      isSale: false,
      isTrending: false,
    };
    setProducts([newProduct, ...products]);
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProducts = products.map((p) =>
      p.id === editingProduct.id
        ? { ...p, ...formData, price: parseFloat(formData.price) }
        : p
    );
    setProducts(updatedProducts);
    setEditingProduct(null);
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const openEditModal = (product: any) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      price: product.price.toString(),
      category: product.category,
      brand: product.brand,
      inStock: product.inStock,
    });
    setIsAddModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      price: '',
      category: '',
      brand: '',
      inStock: true,
    });
    setEditingProduct(null);
  };

  const menuItems = [
    { href: '/admin', icon: 'LayoutDashboard', label: 'Dashboard', active: false },
    { href: '/admin/products', icon: 'Package', label: 'Ürünler', active: true },
    { href: '/admin/orders', icon: 'ShoppingCart', label: 'Siparişler', active: false },
    { href: '/admin/users', icon: 'Users', label: 'Kullanıcılar', active: false },
    { href: '/admin/settings', icon: 'Settings', label: 'Ayarlar', active: false },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plus className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Ürün Yönetimi</span>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin">Admin Paneline Dön</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="sticky top-8 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    item.active
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  {item.icon === 'LayoutDashboard' && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 9h18" />
                      <path d="M9 21V9" />
                    </svg>
                  )}
                  {item.icon === 'Package' && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m7.5 4.27 9 9.13-9-9.13" />
                      <path d="M21 15a6 6 0 0 1-6 6 6 6 0 0 1-6-6" />
                      <path d="M3.09 6.15a5.6 5.6 0 0 0 1 6.22-2.1 6 6 0 0 0 1 2.1-6.22" />
                      <path d="M12.91 17.85 6.13 6.13" />
                    </svg>
                  )}
                  {item.icon === 'ShoppingCart' && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="8" cy="21" r="1" />
                      <circle cx="19" cy="21" r="1" />
                      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                    </svg>
                  )}
                  {item.icon === 'Users' && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  )}
                  {item.icon === 'Settings' && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 0 0 1.4 1.4l.32.32a2 2 0 0 0 0 0 2.2 2.2l.32-.32a2 2 0 0 0 0 1.4-1.4V4a2 2 0 0 0-2-2z" />
                      <circle cx="12" cy="12" r="3" />
                      <path d="m19.07 4.93-1.35 1.35a7 7 0 0 0-2.2-2.2l-1.35 1.35a2 2 0 0 0-2.2-2.2l1.35-1.35a7 7 0 0 0 2.2-2.2l-1.35 1.35a2 2 0 0 0 2.2 2.2z" />
                      <path d="m4.93 19.07-1.35 1.35a7 7 0 0 0 2.2 2.2l1.35-1.35a2 2 0 0 0 2.2 2.2l-1.35 1.35a7 7 0 0 0-2.2 2.2l1.35-1.35a2 2 0 0 0-2.2-2.2z" />
                    </svg>
                  )}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Actions Bar */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Ürün ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Kategoriler</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Ürün Ekle
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingProduct ? 'Ürün Düzenle' : 'Yeni Ürün'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={editingProduct ? handleEditProduct : handleAddProduct} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Ürün Adı *</Label>
                      <Input
                        id="title"
                        required
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        placeholder="Örn: Premium Denim Jacket"
                      />
                    </div>

                    <div>
                      <Label htmlFor="price">Fiyat ($) *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        required
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        placeholder="89.99"
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Kategori *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          setFormData({ ...formData, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Kategori seç" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.name}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="brand">Marka *</Label>
                      <Input
                        id="brand"
                        required
                        value={formData.brand}
                        onChange={(e) =>
                          setFormData({ ...formData, brand: e.target.value })
                        }
                        placeholder="Örn: Urban Style"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="inStock"
                        checked={formData.inStock}
                        onChange={(e) =>
                          setFormData({ ...formData, inStock: e.target.checked })
                        }
                        className="rounded"
                      />
                      <Label htmlFor="inStock">Stokta</Label>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setIsAddModalOpen(false);
                          resetForm();
                        }}
                      >
                        İptal
                      </Button>
                      <Button type="submit" className="flex-1">
                        {editingProduct ? 'Güncelle' : 'Ekle'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Products Table */}
            <div className="rounded-lg border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ürün</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Marka</TableHead>
                    <TableHead>Fiyat</TableHead>
                    <TableHead>Stok</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 overflow-hidden rounded bg-muted">
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div>
                            <p className="font-medium line-clamp-1">
                              {product.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {product.id}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.brand}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.stockCount}</TableCell>
                      <TableCell>
                        {product.inStock ? (
                          <Badge className="bg-green-100 text-green-800">
                            Stokta
                          </Badge>
                        ) : (
                          <Badge variant="destructive">Tükendi</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditModal(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  Ürün bulunamadı
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Toplam {filteredProducts.length} ürün
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Önceki
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Sonraki
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
