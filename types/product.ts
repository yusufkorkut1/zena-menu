export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  price: number;
  category:
    | "hot"
    | "cold"
    | "dessert"
    | "snack"
    | "drink"
    | "vitamin";

  available: boolean;

  image?: string;

  isPopular?: boolean;

  isFeatured?: boolean;

  createdAt?: number;

  updatedAt?: number;
}
