import '@/app/globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/lib/store/cart-provider';
import { WishlistProvider } from '@/lib/store/wishlist-provider';
import { SessionProvider } from '@/app/auth/session-provider';
import { Header } from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ShopAI - Moda Alışveriş Platformu',
  description: 'En trend modayı keşfedin, kişisel tarzınızı bulun',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'ShopAI - Moda Alışveriş Platformu',
    description: 'En trend modayı keşfedin, kişisel tarzınızı bulun',
    url: 'https://shopai.example',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ShopAI - Moda Alışveriş Platformu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShopAI - Moda Alışveriş Platformu',
    description: 'En trend modayı keşfedin, kişisel tarzınızı bulun',
    images: ['/twitter-card.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <CartProvider>
          <WishlistProvider>
            <Header />
            {children}
            <Toaster />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
