"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import { deleteProduct, updateProduct } from "@/services/productService";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(String(product.price));
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  function handleCancel() {
    setName(product.name);
    setDescription(product.description);
    setPrice(String(product.price));
    setIsEditing(false);
  }

  async function handleSave() {
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName || !trimmedDescription || !price) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      setLoading(true);

      await updateProduct(product.id, {
        name: trimmedName,
        description: trimmedDescription,
        price: Number(price) || 0,
      });

      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Ürün güncellenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Bu ürünü silmek istediğinize emin misiniz?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      await deleteProduct(product.id);

      alert("Ürün başarıyla silindi.");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Ürün silinirken hata oluştu.");
    } finally {
      setDeleting(false);
    }
  }

  if (isEditing) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <div className="space-y-3">
          <input
            className="w-full rounded-lg bg-zinc-800 p-3 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            className="w-full rounded-lg bg-zinc-800 p-3 outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="number"
            className="w-full rounded-lg bg-zinc-800 p-3 outline-none"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="rounded-lg bg-zinc-700 px-4 py-2 transition hover:bg-zinc-600 disabled:opacity-50"
          >
            İptal
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="rounded-lg bg-amber-500 px-4 py-2 font-bold text-black transition hover:bg-amber-400 disabled:opacity-50"
          >
            {loading ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>
    );
  }

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
          onClick={() => setIsEditing(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 transition hover:bg-blue-500"
        >
          Düzenle
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting || loading || isEditing}
          className="rounded-lg bg-red-600 px-4 py-2 transition hover:bg-red-500 disabled:opacity-50"
        >
          {deleting ? "Siliniyor..." : "Sil"}
        </button>
      </div>
    </div>
  );
}
