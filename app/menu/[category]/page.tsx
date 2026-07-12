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
    <main className="min-h-screen bg-black px-5 py-6 text-white">
      <div className="mx-auto max-w-3xl">

        <Link
          href="/"
          className="mb-8 inline-flex items-center rounded-full border border-amber-500/20 bg-zinc-950/80 px-4 py-2 text-sm font-semibold text-amber-400 transition hover:border-amber-400 hover:bg-amber-500 hover:text-black"
        >
          ← Ana Menü
        </Link>

        <header className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
            ZENA Menü
          </p>

          <h1 className="text-4xl font-black leading-tight text-amber-500">
            {getCategoryLabel(categoryData)}
          </h1>
        </header>

        <div className="space-y-4">
          {products.length === 0 && (
            <div className="rounded-2xl border border-amber-500/20 bg-zinc-950/80 p-6 text-center text-zinc-400">
              Bu kategoride henüz ürün bulunmuyor.
            </div>
          )}

          {products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-3xl border border-amber-500/15 bg-zinc-950/90 shadow-[0_18px_60px_rgba(0,0,0,0.26)] transition-all duration-300 hover:border-amber-400/60"
            >
              <div className="flex flex-col gap-4 p-4 sm:flex-row">

                <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-2xl border border-amber-500/10 bg-zinc-900 sm:h-28 sm:w-28">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={160}
                      height={160}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_55%),#111] text-3xl text-amber-500">
                      {categoryData.emoji}
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg font-bold leading-snug text-white">
                        {product.name}
                      </h2>

                      {product.isPopular && (
                        <span className="mt-2 inline-flex rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-400">
                          Popüler
                        </span>
                      )}
                    </div>

                    <span className="shrink-0 text-xl font-black text-amber-500">
                      {product.price} ₺
                    </span>
                  </div>

                  <p className="mt-3 break-words text-sm leading-6 text-zinc-400">
                    {product.description}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
