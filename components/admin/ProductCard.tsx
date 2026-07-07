"use client";

import { Product } from "@/types/product";
import { useRouter } from "next/navigation";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <div>
        <h3 className="text-lg font-semibold text-white">
          {product.name}
        </h3>

        <p className="mt-1 text-sm text-gray-400">
          {product.description}
        </p>

        <p className="mt-2 text-xs text-zinc-500">
          Kategori: {product.category}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-bold text-amber-500">
          {product.price} ₺
        </span>

        <button
          type="button"
          onClick={() => alert("Düzenleme özelliği bir sonraki adımda eklenecek.")}
          className="rounded-lg bg-blue-600 px-4 py-2 transition hover:bg-blue-500"
        >
          Düzenle
        </button>

        <button
          type="button"
          onClick={() => alert("Silme özelliği Sprint 2'de eklenecek.")}
          className="rounded-lg bg-red-600 px-4 py-2 transition hover:bg-red-500"
        >
          Sil
        </button>
      </div>
    </div>
  );
}
