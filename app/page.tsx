import Image from "next/image";
import Hero from "@/components/Hero";
import Background from "@/components/Background";
import CategoryCard from "@/components/CategoryCard";
import Footer from "@/components/Footer";
import { CATEGORIES, getCategoryLabel } from "@/constants/categories";
import { getFeaturedProduct } from "@/services/productService";

export const revalidate = 60;

export default async function Home() {
  const featuredProduct = await getFeaturedProduct();

  return (
    <>
      <Background />

      <main className="flex min-h-screen items-center justify-center px-5 py-10">

        <div className="w-full max-w-md">

          <Hero />

          {featuredProduct && (
            <section className="mb-6 overflow-hidden rounded-3xl border border-amber-500/25 bg-zinc-950/90 shadow-[0_22px_70px_rgba(0,0,0,0.32)]">
              <div className="relative h-56 border-b border-amber-500/10 bg-zinc-900">
                {featuredProduct.image ? (
                  <Image
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 448px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_55%),#111] text-6xl text-amber-500">
                    ☕
                  </div>
                )}

                <div className="absolute left-4 top-4 rounded-full bg-amber-500 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-black">
                  Günün Önerisi
                </div>
              </div>

              <div className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h2 className="min-w-0 flex-1 text-xl font-black leading-snug text-white">
                    {featuredProduct.name}
                  </h2>

                  <span className="shrink-0 text-2xl font-black text-amber-500">
                    {featuredProduct.price} ₺
                  </span>
                </div>

                <p className="mt-3 break-words text-sm leading-6 text-zinc-400">
                  {featuredProduct.description}
                </p>
              </div>
            </section>
          )}

          <div className="space-y-3">

            {CATEGORIES.map((category) => (

              <CategoryCard
                key={category.id}
                title={getCategoryLabel(category)}
                href={`/menu/${category.id}`}
              />

            ))}

          </div>

          <Footer />

        </div>

      </main>
    </>
  );
}
