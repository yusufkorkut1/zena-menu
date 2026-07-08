import type { Product } from "@/types/product";

export type Category = {
  id: Product["category"];
  title: string;
  emoji: string;
};

export const CATEGORIES = [
  {
    id: "hot",
    title: "Sıcak Kahveler",
    emoji: "☕",
  },
  {
    id: "cold",
    title: "Soğuk Kahveler",
    emoji: "🧊",
  },
  {
    id: "dessert",
    title: "Waffle & Tatlı",
    emoji: "🧇",
  },
  {
    id: "snack",
    title: "Atıştırmalıklar",
    emoji: "🥐",
  },
  {
    id: "drink",
    title: "Soğuk İçecekler",
    emoji: "🥤",
  },
  {
    id: "vitamin",
    title: "Vitamin Bar",
    emoji: "🍊",
  },
] as const satisfies readonly Category[];

export function getCategoryLabel(category: Pick<Category, "emoji" | "title">) {
  return `${category.emoji} ${category.title}`;
}
