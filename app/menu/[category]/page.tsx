import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategoryLabel } from "@/constants/categories";
import { getProductsByCategory } from "@/services/productService";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { category } = await params;
  const categoryData = CATEGORIES.find((item) => item.id === category);

  if (!categoryData) {
    notFound();
  }

  const products = await getProductsByCategory(categoryData.id);

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto">

        {/* Geri Butonu */}
        <Link
          href="/"
          className="inline-block mb-8 text-amber-500 hover:text-amber-400 transition"
        >
          ← Ana Menü
        </Link>

        {/* Başlık */}
        <h1 className="text-4xl font-bold text-center text-amber-500 mb-10">
          {getCategoryLabel(categoryData)}
        </h1>

        {/* Ürünler */}
        <div className="space-y-5">
          {products.length === 0 && (
            <div className="rounded-2xl border border-amber-500/20 bg-zinc-900 p-5 text-center text-gray-400">
              Bu kategoride henüz ürün bulunmuyor.
            </div>
          )}

          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-amber-500/20 bg-zinc-900 p-5 hover:border-amber-500 hover:bg-zinc-800 transition-all duration-300"
            >
              <div className="flex justify-between items-start">

                <div className="flex items-start gap-4">
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={96}
                      height={96}
                      className="h-24 w-24 shrink-0 rounded-xl object-cover"
                    />
                  )}

                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {product.name}
                    </h2>

                    <p className="text-gray-400 mt-2">
                      {product.description}
                    </p>
                  </div>
                </div>

                <span className="text-2xl font-bold text-amber-500">
                  {product.price} ₺
                </span>

              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
