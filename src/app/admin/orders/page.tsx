'use client';

import { useState } from 'react';
import { orders as mockOrders } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Eye,
  Search,
  Download,
  Filter,
} from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shippingAddress.fullName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusMap: any = {
      Processing: { className: 'bg-yellow-100 text-yellow-800', label: 'İşleniyor' },
      Shipped: { className: 'bg-blue-100 text-blue-800', label: 'Kargoya Verildi' },
      Delivered: { className: 'bg-green-100 text-green-800', label: 'Teslim Edildi' },
      Cancelled: { className: 'bg-red-100 text-red-800', label: 'İptal Edildi' },
    };

    const config = statusMap[status] || statusMap.Processing;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleExportOrders = () => {
    const csvContent = [
      ['Order ID', 'Date', 'Customer', 'Status', 'Total'].join(','),
      ...filteredOrders.map((order) =>
        [
          order.id,
          order.orderDate,
          order.shippingAddress.fullName,
          order.status,
          order.total.toFixed(2),
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `siparisler-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const menuItems = [
    { href: '/admin', icon: 'LayoutDashboard', label: 'Dashboard', active: false },
    { href: '/admin/products', icon: 'Package', label: 'Ürünler', active: false },
    { href: '/admin/orders', icon: 'ShoppingCart', label: 'Siparişler', active: true },
    { href: '/admin/users', icon: 'Users', label: 'Kullanıcılar', active: false },
    { href: '/admin/settings', icon: 'Settings', label: 'Ayarlar', active: false },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Sipariş Yönetimi</span>
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
                      <path d="M3.09 6.15a5.6 5.6 0 0 1 6.22-2.1 6 6 0 0 1 2.1-6.22" />
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
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 0 0 1.4 1.4l.32.32a2 2 0 0 0 0 2.2 2.2l.32-.32a2 2 0 0 0 0 1.4-1.4V4a2 2 0 0 0-2-2z" />
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
          <main className="flex-1 space-y-6">
            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Sipariş ara (ID, müşteri)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Durum" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Durumlar</SelectItem>
                    <SelectItem value="Processing">İşleniyor</SelectItem>
                    <SelectItem value="Shipped">Kargoya Verildi</SelectItem>
                    <SelectItem value="Delivered">Teslim Edildi</SelectItem>
                    <SelectItem value="Cancelled">İptal Edildi</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" onClick={handleExportOrders}>
                  <Download className="mr-2 h-4 w-4" />
                  Dışa Aktar
                </Button>
              </div>
            </div>

            {/* Orders Table */}
            <div className="rounded-lg border bg-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sipariş No</TableHead>
                    <TableHead>Tarih</TableHead>
                    <TableHead>Müşteri</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Ürün Sayısı</TableHead>
                    <TableHead className="text-right">Toplam</TableHead>
                    <TableHead className="text-right">İşlem</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <span className="font-medium">{order.id}</span>
                      </TableCell>
                      <TableCell>{order.orderDate}</TableCell>
                      <TableCell>{order.shippingAddress.fullName}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{order.items.length}</TableCell>
                      <TableCell className="text-right font-medium">
                        ${order.total.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredOrders.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  Sipariş bulunamadı
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg border bg-card p-4">
                <p className="text-sm text-muted-foreground">Toplam Sipariş</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <p className="text-sm text-muted-foreground">Bekleyen</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {orders.filter((o) => o.status === 'Processing').length}
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <p className="text-sm text-muted-foreground">Toplam Gelir</p>
                <p className="text-2xl font-bold text-green-600">
                  $
                  {orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredOrders.length} sipariş gösteriliyor
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

      {/* Order Details Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Sipariş Detayları</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Sipariş No</p>
                  <p className="font-bold">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tarih</p>
                  <p className="font-bold">{selectedOrder.orderDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Durum</p>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ödeme Yöntemi</p>
                  <p className="font-bold">{selectedOrder.paymentMethod}</p>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Teslimat Adresi</p>
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="font-medium">
                    {selectedOrder.shippingAddress.fullName}
                  </p>
                  <p className="text-sm">{selectedOrder.shippingAddress.street}</p>
                  <p className="text-sm">
                    {selectedOrder.shippingAddress.city},{' '}
                    {selectedOrder.shippingAddress.state}{' '}
                    {selectedOrder.shippingAddress.zipCode}
                  </p>
                  <p className="text-sm">
                    {selectedOrder.shippingAddress.country}
                  </p>
                  <p className="text-sm">{selectedOrder.shippingAddress.phone}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Sipariş Ürünleri</p>
                <div className="rounded-lg border bg-muted/50">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 text-sm font-medium">
                          Ürün
                        </th>
                        <th className="text-left p-3 text-sm font-medium">
                          Varyant
                        </th>
                        <th className="text-center p-3 text-sm font-medium">
                          Miktar
                        </th>
                        <th className="text-right p-3 text-sm font-medium">
                          Fiyat
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item: any) => (
                        <tr key={item.productId} className="border-b">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.productTitle}
                                className="h-12 w-12 rounded object-cover"
                              />
                              <span className="text-sm">{item.productTitle}</span>
                            </div>
                          </td>
                          <td className="p-3 text-sm">
                            {item.variant.size} / {item.variant.color}
                          </td>
                          <td className="p-3 text-center text-sm">
                            {item.quantity}
                          </td>
                          <td className="p-3 text-right font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Total */}
              <div className="rounded-lg border bg-card p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ara Toplam</span>
                    <span>${selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">İndirim</span>
                    <span>-${selectedOrder.discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Kargo</span>
                    <span>
                      {selectedOrder.shipping === 0
                        ? 'Ücretsiz'
                        : `$${selectedOrder.shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vergi</span>
                    <span>${selectedOrder.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Toplam</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
