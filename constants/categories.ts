import type { Product } from "@/types/product";

export type Category = {
  id: Product["category"];
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  emoji: string;
};

export type Language = "tr" | "en";

export const CATEGORIES = [
  {
    id: "hot",
    title: "Sıcak Kahveler",
    titleEn: "Hot Coffees",
    description: "Klasik ve özel sıcak lezzetler",
    descriptionEn: "Classic and signature hot flavors",
    emoji: "☕",
  },
  {
    id: "cold",
    title: "Soğuk Kahveler",
    titleEn: "Cold Coffees",
    description: "Ferahlık veren kahve seçenekleri",
    descriptionEn: "Refreshing coffee selections",
    emoji: "🧊",
  },
  {
    id: "dessert",
    title: "Waffle & Tatlı",
    titleEn: "Waffles & Desserts",
    description: "Tatlı molalar için",
    descriptionEn: "For sweet moments",
    emoji: "🧇",
  },
  {
    id: "snack",
    title: "Atıştırmalıklar",
    titleEn: "Snacks",
    description: "Kahvenin yanına hafif eşlikçiler",
    descriptionEn: "Light bites for your coffee",
    emoji: "🥐",
  },
  {
    id: "drink",
    title: "Soğuk İçecekler",
    titleEn: "Cold Drinks",
    description: "Serin ve canlı içecekler",
    descriptionEn: "Cool and vibrant drinks",
    emoji: "🥤",
  },
  {
    id: "vitamin",
    title: "Vitamin Bar",
    titleEn: "Vitamin Bar",
    description: "Taze ve enerjik seçenekler",
    descriptionEn: "Fresh and energizing options",
    emoji: "🍊",
  },
] as const satisfies readonly Category[];

export function getCategoryLabel(
  category: Pick<Category, "emoji" | "title" | "titleEn">,
  language: Language = "tr"
) {
  return `${category.emoji} ${
    language === "en" ? category.titleEn : category.title
  }`;
}

export function getCategoryDescription(
  category: Pick<Category, "description" | "descriptionEn">,
  language: Language = "tr"
) {
  return language === "en" ? category.descriptionEn : category.description;
}
