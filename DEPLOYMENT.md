# 🛒 ShopAI - E-Ticaret Platformu

Next.js 15 ile geliştirilmiş modern, AI destekli bir e-ticaret platformu.

## 🚀 Özellikler

- ✅ **Admin Paneli** - Ürün, sipariş ve kullanıcı yönetimi
- ✅ **AI Öneri Sistemi** - Kişiselleştirilmiş ürün önerileri
- ✅ **Sepet ve Ödeme** - Tam çalışan sepet ve ödeme akışı
- ✅ **Style Quiz** - AI tabanlı stil öneri testi
- ✅ **Responsive Tasarım** - Tüm cihazlarda çalışır
- ✅ **Animasyonlar** - Framer Motion ile akıcı geçişler

## 📋 Kurulum

```bash
# Bağımlılıkları yükle
bun install

# Dev sunucusunu başlat
bun run dev
```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

## 🌐 Vercel'e Yükleme

### Adım 1: GitHub'a Push Et

```bash
# Git'i başlat (henüz yapmadıysanız)
git init

# Tüm dosyaları ekle
git add .

# İlk commit
git commit -m "Initial commit: ShopAI e-commerce platform"

# GitHub repo oluşturun ve URL'i kopyalayın
git remote add origin https://github.com/KULLANICI_ADI/shopai.git

# Push et
git push -u origin main
```

### Adım 2: Vercel'e Import Et

1. [Vercel Dashboard](https://vercel.com/dashboard)'a gidin
2. **"Add New Project"** butonuna tıklayın
3. **"Continue with GitHub"** seçeneğini seçin
4. Repo listesinden `shopai`'yi seçin
5. **Import** butonuna tıklayın

### Adım 3: Build Ayarları

Vercel otomatik olarak Next.js projesini tanıyacak, ancak şu ayarları kontrol edin:

**Build Command:**
```
npm run build
```
veya
```
bun run build
```

**Output Directory:**
```
.next
```

**Install Command:**
```
npm install
```
veya
```
bun install
```

### Adım 4: Ortam Değişkenleri (İsteğe Bağlı)

Production için ortam değişkenleri eklemeniz gerekebilir:

```env
# Vercel Dashboard > Settings > Environment Variables

DATABASE_URL=sqlite:./prod.db
NEXTAUTH_SECRET=rastgele_uzun_string
NEXTAUTH_URL=https://yourdomain.vercel.app
```

### Adım 5: Deploy!

**"Deploy"** butonuna tıklayın ve bekleyin. Vercel uygulamanızı derleyecek ve dağıtacaktır.

✅ Başarılıysa: `https://shopai.vercel.app` gibi bir URL alacaksınız

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js 15 App Router
│   ├── page.tsx           # Ana sayfa
│   ├── products/           # Ürün sayfaları
│   ├── cart/              # Sepet
│   ├── checkout/           # Ödeme
│   ├── admin/             # Admin paneli
│   │   ├── page.tsx      # Dashboard
│   │   ├── products/      # Ürün yönetimi
│   │   ├── orders/        # Sipariş yönetimi
│   │   └── users/         # Kullanıcı yönetimi
│   └── layout.tsx         # Root layout
├── components/             # Reusable bileşenler
│   ├── ui/               # shadcn/ui bileşenleri
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ProductCard.tsx
├── lib/
│   ├── mock-data.ts       # Mock veri
│   ├── store/            # Zustand stores
│   └── utils.ts
└── styles/
    └── globals.css
```

## 🔧 Admin Paneli Erişimi

Development ortamında:
```
http://localhost:3000/admin
```

Production ortamında (Vercel deploy sonrası):
```
https://yourdomain.vercel.app/admin
```

### Admin Paneli Sayfaları:

- **Dashboard** - Genel istatistikler ve son aktiviteler
- **Ürünler** (`/admin/products`) - Ürün ekleme, düzenleme, silme
- **Siparişler** (`/admin/orders`) - Sipariş görüntüleme ve durum güncelleme
- **Kullanıcılar** (`/admin/users`) - Kullanıcı listesi ve detayları
- **Ayarlar** - Site ayarları (yakında)

## 🌍 Türkçe Çeviri Planı

Şu an mevcut: Admin paneli Türkçe yapıldı.

**Tam Türkçe versiyon için:**

Aşağıdaki kısımların çevrilmesi gerekiyor:

1. **Frontend Metinleri** - Müşteri arayüzü
2. **Store Metinleri** - Zustand store mesajları
3. **Form Validasyonları** - Zod hata mesajları
4. **Email Şablonları** - Sipariş onay e-postaları

**Çeviri için kullanılacak yapı:**

```typescript
// lib/i18n/tr.ts
export const tr = {
  common: {
    addToCart: 'Sepete Ekle',
    checkout: 'Ödeme Yap',
    search: 'Ara',
    // ...
  },
  products: {
    title: 'Ürünler',
    filter: 'Filtre',
    // ...
  }
}

// components/Header.tsx
import { tr } from '@/lib/i18n/tr';

<Button>{tr.common.addToCart}</Button>
```

## 🎨 Kullanılan Teknolojiler

- **Framework:** Next.js 15 (App Router)
- **Dil:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Form Validation:** Zod
- **Icons:** Lucide React

## 📝 Notlar

- Bu proje mock data kullanır (production için gerçek backend gerekir)
- Veritabanı olarak Prisma + SQLite kullanılabilir
- NextAuth.js kullanılarak authentication eklenebilir
- Production için Stripe ile ödeme entegrasyonu yapılabilir

## 🤝 Katkıda Bulunma

1. Bu repo'yu fork edin
2. Feature branch oluşturun (`git checkout -b feature/ozellik`)
3. Değişikliklerinizi commit edin
4. Branch'inizi push edin
5. Pull Request oluşturun

## 📄 Lisans

MIT Lisansı - Detaylar için LICENSE dosyasına bakın

## 🆘 Destek

Sorularınız için Issue açabilir veya e-posta gönderebilirsiniz.

---

**🎉 Tebrikler! Artık modern bir e-ticaret platformunuz var!**
