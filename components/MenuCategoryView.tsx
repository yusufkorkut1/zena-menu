"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getCategoryLabel, type Category } from "@/constants/categories";
import {
  customerText,
  getProductDescription,
  getProductName,
} from "@/lib/customerI18n";
import type { Product } from "@/types/product";

type Props = {
  category: Category;
  products: Product[];
};

export default function MenuCategoryView({ category, products }: Props) {
  const { language } = useLanguage();
  const t = customerText[language];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="sticky top-3 z-20 mb-8 flex items-center justify-between gap-3 rounded-full border border-amber-500/15 bg-black/60 px-3 py-2 backdrop-blur-md">
        <Link
          href="/"
          className="inline-flex min-w-0 items-center rounded-full px-3 py-2 text-sm font-bold text-amber-400 transition duration-300 hover:bg-amber-500/10"
        >
          <span className="truncate">← {t.mainMenu}</span>
        </Link>

        <LanguageSwitcher />
      </div>

      <header className="mb-8 text-center">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-amber-400">
          {t.menuEyebrow}
        </p>

        <h1 className="text-4xl font-black leading-tight text-amber-500 sm:text-5xl">
          {getCategoryLabel(category, language)}
        </h1>
      </header>

      <div className="space-y-4">
        {products.length === 0 && (
          <div className="rounded-3xl border border-amber-500/20 bg-zinc-950/80 p-6 text-center text-zinc-400">
            {t.emptyCategory}
          </div>
        )}

        {products.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-[1.75rem] border border-amber-500/15 bg-zinc-950/90 shadow-[0_18px_60px_rgba(0,0,0,0.28)] transition duration-300 hover:border-amber-400/60"
          >
            <div className="flex flex-col gap-4 p-4 sm:flex-row">
              <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-3xl border border-amber-500/10 bg-zinc-900 sm:h-32 sm:w-32">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={getProductName(product, language)}
                    fill
                    sizes="(max-width: 640px) 100vw, 160px"
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_55%),#111] text-4xl text-amber-500">
                    {category.emoji}
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-black leading-snug text-white">
                      {getProductName(product, language)}
                    </h2>

                    {product.isPopular && (
                      <span className="mt-2 inline-flex rounded-full bg-amber-500/15 px-3 py-1 text-xs font-black text-amber-400">
                        {t.popular}
                      </span>
                    )}
                  </div>

                  <span className="shrink-0 rounded-full bg-amber-500/10 px-3 py-1 text-xl font-black text-amber-400">
                    {product.price} ₺
                  </span>
                </div>

                <p className="mt-3 break-words text-sm leading-6 text-zinc-400">
                  {getProductDescription(product, language)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
