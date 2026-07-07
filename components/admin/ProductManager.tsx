import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import { Product } from "@/types/product";

type Props = {
  products: Product[];
};

export default function ProductManager({ products }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Ürün Listesi */}
      <div className="lg:col-span-2">
        <ProductList products={products} />
      </div>

      {/* Ürün Ekle */}
      <div>
        <ProductForm />
      </div>
    </div>
  );
}
