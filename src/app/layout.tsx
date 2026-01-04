import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { db } from '@/lib/db';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const seoSettings = await db.sEOSettings.findFirst();

  return {
    title: seoSettings?.siteName || "ShopAI - AI-Powered E-Commerce Platform",
    description: seoSettings?.siteDescription || "Discover your perfect style with AI-powered recommendations. Shop the latest trends in fashion, accessories, and more.",
    keywords: seoSettings?.keywords?.split(',') || ["ShopAI", "AI", "e-commerce", "fashion", "shopping", "style quiz", "personalized recommendations"],
  authors: [{ name: "ShopAI Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
      title: seoSettings?.siteName || "ShopAI - AI-Powered E-Commerce",
      description: seoSettings?.siteDescription || "Discover your perfect style with AI-powered recommendations",
    type: "website",
      images: [seoSettings?.ogImage || '/og-image.jpg'],
  },
  twitter: {
    card: "summary_large_image",
      title: seoSettings?.siteName || "ShopAI - AI-Powered E-Commerce",
      description: seoSettings?.siteDescription || "Discover your perfect style with AI-powered recommendations",
      images: [seoSettings?.twitterCard || '/twitter-card.jpg'],
  },
};
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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

