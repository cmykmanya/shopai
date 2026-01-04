import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopAI - AI-Powered E-Commerce Platform",
  description: "Discover your perfect style with AI-powered recommendations. Shop the latest trends in fashion, accessories, and more.",
  keywords: ["ShopAI", "AI", "e-commerce", "fashion", "shopping", "style quiz", "personalized recommendations"],
  authors: [{ name: "ShopAI Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "ShopAI - AI-Powered E-Commerce",
    description: "Discover your perfect style with AI-powered recommendations",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShopAI - AI-Powered E-Commerce",
    description: "Discover your perfect style with AI-powered recommendations",
  },
};

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
