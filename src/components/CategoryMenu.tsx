"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: "giyim",
    name: "Giyim",
    subcategories: [
      { id: "ust-giyim", name: "Üst Giyim", link: "/products?category=ust-giyim" },
      { id: "alt-giyim", name: "Alt Giyim", link: "/products?category=alt-giyim" },
      { id: "elbise", name: "Elbiseler", link: "/products?category=elbise" },
    ],
  },
  {
    id: "ayakkabi",
    name: "Ayakkabı",
    subcategories: [
      { id: "spor-ayakkabi", name: "Spor Ayakkabı", link: "/products?category=spor-ayakkabi" },
      { id: "klasik-ayakkabi", name: "Klasik Ayakkabı", link: "/products?category=klasik-ayakkabi" },
      { id: "cizme", name: "Çizme", link: "/products?category=cizme" },
    ],
  },
  {
    id: "aksesuar",
    name: "Aksesuar",
    subcategories: [
      { id: "canta", name: "Çanta", link: "/products?category=canta" },
      { id: "saat", name: "Saat", link: "/products?category=saat" },
      { id: "gozluk", name: "Gözlük", link: "/products?category=gozluk" },
    ],
  },
];

export function CategoryMenu() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="space-y-1">
        {categories.map((category) => (
          <div key={category.id} className="border rounded-lg overflow-hidden">
            <Button
              variant="ghost"
              className="w-full justify-between text-lg font-medium"
              onClick={() => setOpenCategory(openCategory === category.id ? null : category.id)}
            >
              {category.name}
              {openCategory === category.id ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
            <div className={cn("grid transition-all duration-300 ease-in-out", openCategory === category.id ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
              <div className="overflow-hidden">
                <div className="space-y-1 p-2">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      href={subcategory.link}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md"
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}