'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store/user-store';
import { useWishlistStore } from '@/lib/store/wishlist-store';
import { useCartStore } from '@/lib/store/cart-store';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ShoppingBag, Heart, MapPin, LogOut, Package, Edit2, Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/lib/mock-data';

type Tab = 'profile' | 'orders' | 'wishlist' | 'addresses';

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, updateProfile, orders, addOrder } = useUserStore();
  const { isInWishlist } = useWishlistStore();
  const addItem = useCartStore((state) => state.addItem);

  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <User className="h-24 w-24 text-muted-foreground/30 mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-2">Sign In Required</h1>
          <p className="text-muted-foreground mb-6">
            Please sign in to access your account
          </p>
          <Button size="lg" onClick={() => router.push('/')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  const handleSaveProfile = () => {
    updateProfile(editedProfile);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReorder = (order: any) => {
    order.items.forEach((item: any) => {
      addItem({
        productId: item.productId,
        productTitle: item.productTitle,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        variant: item.variant,
      });
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'profile'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'orders'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <Package className="h-5 w-5" />
              <span>Orders</span>
              {orders.length > 0 && (
                <Badge variant="secondary" className="ml-auto">
                  {orders.length}
                </Badge>
              )}
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'wishlist'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <Heart className="h-5 w-5" />
              <span>Wishlist</span>
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'addresses'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <MapPin className="h-5 w-5" />
              <span>Addresses</span>
            </button>
          </div>

          <Separator className="my-6" />

          <Button
            variant="outline"
            className="w-full text-destructive hover:text-destructive"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Profile Information</h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsEditing(!isEditing);
                        setEditedProfile({
                          name: user?.name || '',
                          email: user?.email || '',
                          phone: user?.phone || '',
                        });
                      }}
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>

                  {saveSuccess && (
                    <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      <span>Profile updated successfully!</span>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <Label>Full Name</Label>
                      {isEditing ? (
                        <Input
                          value={editedProfile.name}
                          onChange={(e) =>
                            setEditedProfile({ ...editedProfile, name: e.target.value })
                          }
                        />
                      ) : (
                        <p className="text-lg font-medium">{user?.name}</p>
                      )}
                    </div>

                    <div>
                      <Label>Email Address</Label>
                      {isEditing ? (
                        <Input
                          type="email"
                          value={editedProfile.email}
                          onChange={(e) =>
                            setEditedProfile({ ...editedProfile, email: e.target.value })
                          }
                        />
                      ) : (
                        <p className="text-lg">{user?.email}</p>
                      )}
                    </div>

                    <div>
                      <Label>Phone Number</Label>
                      {isEditing ? (
                        <Input
                          type="tel"
                          value={editedProfile.phone}
                          onChange={(e) =>
                            setEditedProfile({ ...editedProfile, phone: e.target.value })
                          }
                        />
                      ) : (
                        <p className="text-lg">{user?.phone || 'Not provided'}</p>
                      )}
                    </div>

                    <div>
                      <Label>Member Since</Label>
                      <p className="text-lg text-muted-foreground">
                        {new Date(user?.createdAt || '').toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-6 flex gap-3">
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6">Order History</h2>

                {orders.length === 0 ? (
                  <div className="border rounded-lg p-12 text-center">
                    <Package className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start shopping to see your orders here
                    </p>
                    <Button asChild>
                      <Link href="/products">Start Shopping</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border rounded-lg p-6 space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-bold">{order.id}</h3>
                              <Badge
                                variant={
                                  order.status === 'Delivered'
                                    ? 'default'
                                    : order.status === 'Shipped'
                                    ? 'secondary'
                                    : 'outline'
                                }
                              >
                                {order.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Placed on{' '}
                              {new Date(order.orderDate).toLocaleDateString(
                                'en-US',
                                {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                }
                              )}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold">
                              ${order.total.toFixed(2)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {order.items.length} item{order.items.length > 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {order.items.slice(0, 3).map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 p-3 bg-muted/50 rounded"
                            >
                              <div className="relative aspect-square h-12 w-12 flex-shrink-0 overflow-hidden rounded border">
                                <img
                                  src={item.image}
                                  alt={item.productTitle}
                                  className="object-cover"
                                  loading="lazy"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                  {item.productTitle}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {item.variant.size} / {item.variant.color} × {item.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <div className="flex items-center justify-center p-3 bg-muted/50 rounded">
                              <span className="text-sm text-muted-foreground">
                                +{order.items.length - 3} more
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-3">
                          <Button variant="outline" size="sm" onClick={() => handleReorder(order)}>
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Reorder
                          </Button>
                          {order.status === 'Shipped' && (
                            <Button variant="outline" size="sm">
                              Track Order
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <motion.div
                key="wishlist"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Wishlist</h2>
                  {isInWishlist('prod-1') && (
                    <Button variant="outline" size="sm">
                      Add All to Cart
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products.slice(0, 8).map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>

                {products.length === 0 && (
                  <div className="border rounded-lg p-12 text-center">
                    <Heart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
                    <p className="text-muted-foreground mb-4">
                      Save items you love by clicking the heart icon
                    </p>
                    <Button asChild>
                      <Link href="/products">Browse Products</Link>
                    </Button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <motion.div
                key="addresses"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Saved Addresses</h2>
                  <Button>Add New Address</Button>
                </div>

                {user?.addresses && user.addresses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user.addresses.map((address) => (
                      <div
                        key={address.id}
                        className="border rounded-lg p-4 space-y-2"
                      >
                        {address.isDefault && (
                          <Badge variant="secondary">Default</Badge>
                        )}
                        <div>
                          <p className="font-semibold">{address.fullName}</p>
                          <p className="text-sm text-muted-foreground">
                            {address.street}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {address.city}, {address.state} {address.zipCode}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {address.country}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {address.phone}
                          </p>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          {!address.isDefault && (
                            <Button variant="outline" size="sm">
                              Set as Default
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border rounded-lg p-12 text-center">
                    <MapPin className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No saved addresses</h3>
                    <p className="text-muted-foreground mb-4">
                      Add your addresses for faster checkout
                    </p>
                    <Button>Add New Address</Button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
