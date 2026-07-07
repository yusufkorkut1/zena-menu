import Link from "next/link";
import { getProducts } from "@/services/productService";
import ProductManager from "@/components/admin/ProductManager";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-8">

        <Link
          href="/admin"
          className="text-amber-500 hover:text-amber-400"
        >
          ← Admin Paneli
        </Link>

        <h1 className="text-4xl font-bold text-amber-500 mt-6 mb-10">
          Ürün Yönetimi
        </h1>

        <ProductManager products={products} />

      </div>
    </main>
  );
}
