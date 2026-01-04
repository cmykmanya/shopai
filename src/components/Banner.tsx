"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import Link from "next/link";

const banners = [
  {
    id: 1,
    title: "Yaz İndirimi Başladı!",
    description: "Tüm ürünlerde %50'ye varan indirimler.",
    image: "/placeholder.svg", // Gerçek banner görseli ile değiştirin
    cta: "Hemen Alışverişe Başla",
    link: "/products",
  },
  {
    id: 2,
    title: "Yeni Koleksiyonlar!",
    description: "2024 Yaz Koleksiyonu şimdi mağazada.",
    image: "/placeholder.svg", // Gerçek banner görseli ile değiştirin
    cta: "Keşfet",
    link: "/products",
  },
  {
    id: 3,
    title: "Ücretsiz Kargo!",
    description: "1000 TL üzeri alışverişlerde kargo bedava.",
    image: "/placeholder.svg", // Gerçek banner görseli ile değiştirin
    cta: "Hemen Alışverişe Başla",
    link: "/products",
  },
];

export function Banner() {
  return (
    <Carousel className="w-full max-w-4xl mx-auto my-8">
      <CarouselContent>
        {banners.map((banner) => (
          <CarouselItem key={banner.id}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-video items-center justify-center p-6 relative">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white p-4">
                      <h3 className="text-2xl font-bold mb-2">{banner.title}</h3>
                      <p className="mb-4">{banner.description}</p>
                      <Link href={banner.link} className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                        {banner.cta}
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
}