'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  BarChart3,
  TrendingUp,
  DollarSign,
  ShoppingCart as CartIcon,
} from 'lucide-react';
import { products, orders, users } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    monthlyOrders: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    // Calculate stats from mock data
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter(o => o.status === 'Processing').length;
    
    setStats({
      totalRevenue,
      totalOrders: orders.length,
      totalProducts: products.length,
      totalUsers: users.length,
      monthlyOrders: orders.length, // Mock: assuming all are from this month
      pendingOrders,
    });
  }, []);

  const menuItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard', active: true },
    { href: '/admin/products', icon: Package, label: 'Ürünler', active: false },
    { href: '/admin/orders', icon: ShoppingCart, label: 'Siparişler', active: false },
    { href: '/admin/users', icon: Users, label: 'Kullanıcılar', active: false },
    { href: '/admin/settings', icon: Settings, label: 'Ayarlar', active: false },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Admin Paneli</span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline">Admin</Badge>
            <Button variant="outline" size="sm" asChild>
              <Link href="/">Siteye Git</Link>
            </Button>
          </div>
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
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Hoşgeldiniz! İşte mağazanızın genel görünümü.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${stats.totalRevenue.toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +12.5% geçen aya göre
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Siparişler</CardTitle>
                  <CartIcon className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalOrders}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Bu ay: {stats.monthlyOrders} sipariş
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ürünler</CardTitle>
                  <Package className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalProducts}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Aktif ürünler
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Kullanıcılar</CardTitle>
                  <Users className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Kayıtlı kullanıcılar
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pending Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Bekleyen Siparişler</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentOrders
                      .filter((order) => order.status === 'Processing')
                      .map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-sm">{order.id}</p>
                            <p className="text-xs text-muted-foreground">
                              {order.orderDate}
                            </p>
                          </div>
                          <Badge variant="outline">{order.status}</Badge>
                        </div>
                      ))}
                    {recentOrders.filter((o) => o.status === 'Processing').length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        Bekleyen sipariş yok
                      </p>
                    )}
                  </div>
                  <Button variant="outline" className="w-full mt-4" asChild>
                    <Link href="/admin/orders">Tüm Siparişler</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Son Aktiviteler</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <ShoppingCart className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Yeni sipariş alındı</p>
                        <p className="text-xs text-muted-foreground">
                          ORD-2024-003 • 2 dakika önce
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Yeni kullanıcı kaydı</p>
                        <p className="text-xs text-muted-foreground">
                          Sarah Johnson • 15 dakika önce
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <Package className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Ürün güncellendi</p>
                        <p className="text-xs text-muted-foreground">
                          Premium Denim Jacket • 1 saat önce
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
