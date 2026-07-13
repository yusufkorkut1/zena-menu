import type { Language } from "@/constants/categories";
import type { Product } from "@/types/product";

export const customerText = {
  tr: {
    heroEyebrow: "Ancient Coffee Experience",
    heroSubtitle: "QR Menü • Coffee • Dessert",
    heroSlogan: "Kahvenin en zarif hali.",
    featured: "Günün Önerisi",
    popular: "Popüler",
    mainMenu: "Ana Menü",
    menuEyebrow: "ZENA Menü",
    emptyCategory: "Bu kategoride henüz ürün bulunmuyor.",
    categories: "Kategoriler",
    discover: "Menüyü keşfet",
    featuredCta: "Şimdi Keşfet →",
  },
  en: {
    heroEyebrow: "Ancient Coffee Experience",
    heroSubtitle: "QR Menu • Coffee • Dessert",
    heroSlogan: "Crafted Coffee Experience.",
    featured: "Today’s Special",
    popular: "Popular",
    mainMenu: "Main Menu",
    menuEyebrow: "ZENA Menu",
    emptyCategory: "No products are available in this category yet.",
    categories: "Categories",
    discover: "Explore the menu",
    featuredCta: "Explore →",
  },
} satisfies Record<Language, Record<string, string>>;

export function getProductName(product: Product, language: Language) {
  return language === "en" && product.nameEn ? product.nameEn : product.name;
}

export function getProductDescription(product: Product, language: Language) {
  return language === "en" && product.descriptionEn
    ? product.descriptionEn
    : product.description;
}
