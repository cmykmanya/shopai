import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DefaultSeo } from "next-seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ShopAI - Yapay Zeka Destekli Alışveriş Platformu",
    template: "%s | ShopAI",
  },
  description: "Yapay zeka destekli önerilerle mükemmel stilinizi keşfedin. Moda, aksesuar ve daha fazlasında en yeni trendleri keşfedin.",
  keywords: ["ShopAI", "yapay zeka", "e-ticaret", "moda", "alışveriş", "stil testi", "kişiselleştirilmiş öneriler", "trendler", "giyim", "aksesuar"],
  authors: [{ name: "ShopAI Ekibi" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "ShopAI - Yapay Zeka Destekli Alışveriş",
    description: "Yapay zeka destekli önerilerle mükemmel stilinizi keşfedin",
    type: "website",
    locale: "tr_TR",
    url: "https://shopai.com.tr",
    siteName: "ShopAI",
    images: [
      {
        url: "https://shopai.com.tr/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ShopAI - Yapay Zeka Destekli Alışveriş",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ShopAI - Yapay Zeka Destekli Alışveriş",
    description: "Yapay zeka destekli önerilerle mükemmel stilinizi keşfedin",
    images: ["https://shopai.com.tr/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <DefaultSeo
          openGraph={{
            type: "website",
            locale: "tr_TR",
            url: "https://shopai.com.tr",
            site_name: "ShopAI",
          }}
          twitter={{
            cardType: "summary_large_image",
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Header />
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
