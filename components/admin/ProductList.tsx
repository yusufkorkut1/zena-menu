import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

type Props = {
  products: Product[];
};

export default function ProductList({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl bg-zinc-900 p-6 text-center text-gray-400">
        Henüz ürün bulunmuyor.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}