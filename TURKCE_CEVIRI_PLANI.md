# 🌍 Türkçe Çeviri Planı ve Uygulama Kılavuzu

## 📋 Mevcut Durum

✅ **Tamamlanan Bölümler:**
- Admin Paneli (/admin/*) - Tamamen Türkçe
- Admin Dashboard - İstatistikler, aktiviteler
- Admin Products - Ürün CRUD işlemleri
- Admin Orders - Sipariş yönetimi
- Admin Users - Kullanıcı listesi

⏳ **Çevirisi Gereken Bölümler:**

### 1. Frontend (Müşteri Arayüzü)

#### Ana Sayfa (`/`)
```
Hero Section:
- "Discover Your Style with AI" → "Tarzınızı AI ile Keşfedin"
- "Shop Now" → "Hemen Alışveriş Yap"
- "Take Style Quiz" → "Stil Testi Çöz"
- "Shop by Category" → "Kategoriye Göre Alışveriş"
- "Trending Now" → "Şu An Popüler"
- "Picked Just For You" → "Sizin İçin Seçilen"
- "Subscribe to our newsletter" → "Bültenimize Abone Olun"
- "Get 10% Off Your First Order" → "İlk Siparişinize %10 İndirim"
```

#### Ürün Listesi (`/products`)
```
Filters:
- "Categories" → "Kategoriler"
- "Price Range" → "Fiyat Aralığı"
- "Brands" → "Markalar"
- "Sizes" → "Bedenler"
- "Colors" → "Renkler"
- "Rating" → "Değerlendirme"
- "Availability" → "Stok Durumu"

Sort:
- "Relevance" → "İlgililik"
- "Price: Low to High" → "Fiyat: Düşükten Yükseğe"
- "Newest" → "En Yeni"
- "Best Selling" → "En Çok Satan"

View:
- "Grid View" → "Tablo Görünümü"
- "List View" → "Liste Görünümü"

Empty State:
- "No products found" → "Ürün bulunamadı"
- "Try adjusting your filters" → "Filtrelerinizi deneyin"
```

#### Ürün Detay (`/products/[id]`)
```
- "Add to Cart" → "Sepete Ekle"
- "Buy Now" → "Şimdi Satın Al"
- "Add to Wishlist" → "Favorilere Ekle"
- "Description" → "Açıklama"
- "Reviews" → "Yorumlar"
- "Shipping Info" → "Kargo Bilgisi"
- "Return Policy" → "İade Politikası"
- "In Stock" → "Stokta"
- "Out of Stock" → "Tükendi"
- "Only X left in stock" → "Stokta sadece X adet kaldı"
```

#### Sepet (`/cart`)
```
- "Shopping Cart" → "Alışveriş Sepeti"
- "Your cart is empty" → "Sepetiniz boş"
- "Start Shopping" → "Alışverişe Başla"
- "Subtotal" → "Ara Toplam"
- "Shipping" → "Kargo"
- "Tax" → "Vergi"
- "Total" → "Toplam"
- "Proceed to Checkout" → "Ödemeye Geç"
- "Continue Shopping" → "Alışverişe Devam Et"
- "Coupon Code" → "Kupon Kodu"
- "Apply" → "Uygula"
- "Free shipping over $50" → "$50 üzeri ücretsiz kargo"
```

#### Checkout (`/checkout`)
```
Steps:
- "Shipping" → "Teslimat"
- "Payment" → "Ödeme"
- "Review" → "Gözden Geçirme"

Shipping Form:
- "Full Name" → "Ad Soyad"
- "Email" → "E-posta"
- "Phone" → "Telefon"
- "Address" → "Adres"
- "City" → "Şehir"
- "State" → "Eyalet/İl"
- "ZIP Code" → "Posta Kodu"
- "Country" → "Ülke"
- "Save this address" → "Bu adresi kaydet"

Delivery Options:
- "Standard Shipping" → "Standart Kargo"
- "Express Shipping" → "Express Kargo"
- "Next Day Delivery" → "Ertesi Gün Teslimat"

Payment:
- "Card Number" → "Kart Numarası"
- "Expiry Date" → "Son Kullanma Tarihi"
- "CVV" → "Güvenlik Kodu"
- "Name on Card" → "Kart Üzerindeki İsim"

Review:
- "Review Your Order" → "Siparişinizi Gözden Geçirin"
- "Place Order" → "Sipariş Ver"
- "I agree to Terms of Service" → "Hizmet Şartlarını Kabul Ediyorum"
- "Privacy Policy" → "Gizlilik Politikası"

Success:
- "Order Confirmed!" → "Sipariş Onaylandı!"
- "Thank you for your purchase" → "Alışverişiniz için teşekkürler"
- "Estimated Delivery" → "Tahmini Teslimat"
```

### 2. Header & Footer Components

#### Header
```
Navigation:
- "Home" → "Ana Sayfa"
- "Shop" → "Mağaza"
- "Style Quiz" → "Stil Testi"
- "Account" → "Hesabım"

Search:
- "Search products..." → "Ürün ara..."
- "Trending searches" → "Popüler aramalar"

Cart:
- "Cart (X items)" → "Sepet (X ürün)"
- "View Cart" → "Sepeti Görüntüle"
- "Start Shopping" → "Alışverişe Başla"
```

#### Footer
```
About:
- "About Us" → "Hakkımızda"
- "Our Story" → "Hikayemiz"
- "Careers" → "Kariyer"
- "Blog" → "Blog"

Shop:
- "New Arrivals" → "Yeni Gelenler"
- "Best Sellers" → "En Çok Satanlar"
- "Sale" → "İndirim"

Support:
- "Contact Us" → "İletişim"
- "FAQs" → "Sıkça Sorulan Sorular"
- "Shipping Info" → "Kargo Bilgisi"
- "Returns" → "İadeler"

Legal:
- "Privacy Policy" → "Gizlilik Politikası"
- "Terms of Service" → "Hizmet Şartları"
- "Cookie Policy" → "Çerez Politikası"

Bottom:
- "We Accept" → "Kabul Ettiğimiz"
- "All rights reserved" → "Tüm hakları saklıdır"
```

### 3. State Management Mesajları

#### Cart Store
```typescript
// Toast notifications
toast('Added to cart!', 'success') → toast('Sepete eklendi!', 'success')
toast('Item removed from cart', 'info') → toast('Ürün sepetten kaldırıldı', 'info')
toast('Cart cleared', 'info') → toast('Sepet temizlendi', 'info')
```

#### User Store
```typescript
toast('Please login to continue', 'info') → toast('Devam etmek için lütfen giriş yapın', 'info')
toast('Profile updated successfully', 'success') → toast('Profil başarıyla güncellendi', 'success')
```

### 4. Validasyon Mesajları (Zod)

#### Login Form
```typescript
{
  email: {
    invalid_type_error: "Geçerli bir e-posta adresi girin",
    required_error: "E-posta adresi zorunludur"
  },
  password: {
    required_error: "Şifre zorunludur",
    min_error: "Şifre en az 6 karakter olmalıdır"
  }
}
```

#### Checkout Form
```typescript
{
  fullName: { required_error: "Ad Soyad zorunludur" },
  address: { required_error: "Adres zorunludur" },
  city: { required_error: "Şehir zorunludur" },
  phone: {
    required_error: "Telefon zorunludur",
    invalid_type_error: "Geçerli bir telefon numarası girin"
  },
  zipCode: { required_error: "Posta kodu zorunludur" }
}
```

## 🔧 Uygulama Yöntemi

### Yöntem 1: Manuel Çeviri (Hızlı)

Her bileşeni tek tek çevirin:

```tsx
// ❌ Önce (İngilizce)
<Button>Add to Cart</Button>

// ✅ Sonra (Türkçe)
Button>Sepete Ekle</Button>
```

### Yöntem 2: i18n Object (Önerilen)

1. Çeviri dosyası oluşturun:

```typescript
// lib/i18n/tr.ts
export const tr = {
  header: {
    home: "Ana Sayfa",
    shop: "Mağaza",
    search: "Ara...",
  },
  product: {
    addToCart: "Sepete Ekle",
    buyNow: "Şimdi Satın Al",
    outOfStock: "Tükendi",
  },
  cart: {
    title: "Alışveriş Sepeti",
    empty: "Sepetiniz boş",
    checkout: "Ödemeye Geç",
    total: "Toplam",
  }
};

export default tr;
```

2. Bileşenlerde kullanın:

```tsx
import tr from '@/lib/i18n/tr';

<Button>{tr.product.addToCart}</Button>
<h1>{tr.cart.title}</h1>
```

### Yöntem 3: next-intl (Kapsamlı)

Next.js için built-in internationalization desteği:

1. Paketi kurun:
```bash
bun add next-intl
```

2. Yapılandırın:

```typescript
// next.config.ts
const createNextIntlPlugin = require('next-intl/plugin');

module.exports = {
  // ...
  plugins: [createNextIntlPlugin()],
};
```

3. Çeviri dosyaları oluşturun:

```
messages/
├── en.json
└── tr.json
```

4. Bileşenlerde kullanın:

```tsx
import { useTranslations } from 'next-intl';

function ProductCard() {
  const t = useTranslations('product');
  
  return (
    <Button>{t('addToCart')}</Button>
  );
}
```

## ✅ Öncelik Sıralaması

### Yüksek Öncelik (Kullanıcı Arayüzü)
1. ✅ Header navigasyon
2. ✅ Footer linkleri
3. ✅ Ana sayfa butonları
4. ✅ Sepet sayfası
5. ✅ Checkout adımları

### Orta Öncelik
1. ✅ Ürün listesi filtreler
2. ✅ Ürün detay varyantları
3. ✅ Toast bildirimleri
4. ✅ Validasyon mesajları

### Düşük Öncelik
1. Style Quiz metinleri
2. Account dashboard
3. Review detayları
4. Email şablonları

## 📊 İş Takibi

- ✅ Admin Paneli: %100 Türkçe
- ⏳ Frontend: %10 Türkçe
- ⏳ Validasyonlar: %0 Türkçe
- ⏳ Toast mesajları: %0 Türkçe

**Tahmini Tamamlanma Süresi:** 2-3 saat (manuel çeviri)

## 💡 İpuçları

1. **Kısa ve net çeviriler** kullanın
   - "Add to Cart" → "Sepete Ekle" ✅
   - "Put into your shopping cart" → ❌ (çok uzun)

2. **İsim kullanımı** tutarlı olun
   - Eğer "Sepete Ekle" kullanıyorsanız, her yerde "Sepete Ekle"

3. **Kültürel uygunluk** göz önünde bulundurun
   - Türk kullanıcı alışkanlıklarına uygun
   - Resmi ama samimi ton

4. **Sıfatları Türkçe kullanın**
   - "Add" → "Ekle" (Ekleme değil)
   - "Search" → "Ara" (Arama değil)

## 🚀 Sonraki Adımlar

1. **Manuel Çeviri Yapın:**
   - Component dosyalarını tek tek açın
   - İngilizce metinleri Türkçe'ye çevirin
   - Test edin

2. **Veya next-intl Kullanın:**
   - Projenizi yeniden yapılandırın
   - Çeviri dosyalarını oluşturun
   - Dil seçici ekle

3. **Test Edin:**
   - Tüm sayfaları gezin
   - Eksik çeviri kontrol edin
   - Gramer ve yazım denetimi yapın

---

**🎯 Hedef:** Tam Türkçe e-ticaret platformu!

Kardeşim, bu planı kullanarak projeyi Türkçe'ye çevirebilirsin. Önce admin paneli hazırlandı. Frontend'i istersen manuel çevirebilir veya next-intl kullanabilirsin.
