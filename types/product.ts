export interface Product {
  id: string;
  name: string;
  description: string;
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
