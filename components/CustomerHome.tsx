"use client";

import Image from "next/image";
import Link from "next/link";
import CategoryCard from "@/components/CategoryCard";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { useLanguage } from "@/components/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {
  CATEGORIES,
  getCategoryDescription,
  getCategoryLabel,
} from "@/constants/categories";
import {
  customerText,
  getProductDescription,
  getProductName,
} from "@/lib/customerI18n";
import type { Product } from "@/types/product";

type Props = {
  featuredProduct: Product | null;
};

export default function CustomerHome({ featuredProduct }: Props) {
  const { language } = useLanguage();
  const t = customerText[language];

  return (
    <div className="w-full max-w-md">
      <div className="sticky top-3 z-20 mb-6 flex items-center justify-between rounded-full border border-amber-500/15 bg-black/55 px-3 py-2 backdrop-blur-md">
        <span className="text-xs font-black uppercase tracking-[0.22em] text-amber-400">
          ZENA
        </span>
        <LanguageSwitcher />
      </div>

      <Hero
        eyebrow={t.heroEyebrow}
        subtitle={t.heroSubtitle}
        slogan={t.heroSlogan}
      />

      {featuredProduct && (
        <section className="mb-6 overflow-hidden rounded-[2rem] border border-amber-500/25 bg-zinc-950/90 shadow-[0_24px_80px_rgba(0,0,0,0.36)] transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/60">
          <div className="relative h-64 border-b border-amber-500/10 bg-zinc-900">
            {featuredProduct.image ? (
              <Image
                src={featuredProduct.image}
                alt={getProductName(featuredProduct, language)}
                fill
                sizes="(max-width: 768px) 100vw, 448px"
                className="object-cover transition duration-500 hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_55%),#111] text-6xl text-amber-500">
                ☕
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />

            <div className="absolute left-4 top-4 rounded-full bg-amber-500 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-black">
              {t.featured}
            </div>
          </div>

          <div className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h2 className="min-w-0 flex-1 text-2xl font-black leading-tight text-white">
                {getProductName(featuredProduct, language)}
              </h2>

              <span className="shrink-0 rounded-full bg-amber-500/10 px-3 py-1 text-2xl font-black text-amber-400">
                {featuredProduct.price} ₺
              </span>
            </div>

            <p className="mt-3 break-words text-sm leading-6 text-zinc-400">
              {getProductDescription(featuredProduct, language)}
            </p>

            <Link
              href={`/menu/${featuredProduct.category}`}
              className="group mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-5 py-3 text-sm font-black text-black shadow-[0_14px_40px_rgba(245,158,11,0.22)] transition duration-300 hover:-translate-y-0.5 hover:from-amber-300 hover:to-amber-500"
            >
              <span>{t.featuredCta}</span>
              <span className="transition duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </section>
      )}

      <div className="mb-3 flex items-end justify-between gap-3 px-1">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-amber-400">
          {t.categories}
        </p>
        <p className="text-right text-xs text-zinc-500">{t.discover}</p>
      </div>

      <div className="space-y-3">
        {CATEGORIES.map((category) => (
          <CategoryCard
            key={category.id}
            title={getCategoryLabel(category, language)}
            caption={getCategoryDescription(category, language)}
            href={`/menu/${category.id}`}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}
