"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addProduct } from "@/services/productService";
import type { Product } from "@/types/product";

export default function ProductForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [category, setCategory] =
    useState<Product["category"]>("hot");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name || !description || !price) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      setLoading(true);

      await addProduct({
        name,
        description,
        price: Number(price),
        category,
        available: true,
      });

      setName("");
      setDescription("");
      setPrice("");
      setCategory("hot");

      router.refresh();

      alert("Ürün başarıyla eklendi.");
    } catch (error) {
      console.error(error);
      alert("Ürün eklenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Yeni Ürün
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full rounded-lg bg-zinc-800 p-3 outline-none"
          placeholder="Ürün Adı"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="w-full rounded-lg bg-zinc-800 p-3 outline-none"
          placeholder="Açıklama"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          className="w-full rounded-lg bg-zinc-800 p-3 outline-none"
          placeholder="Fiyat"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <select
          className="w-full rounded-lg bg-zinc-800 p-3 outline-none"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as Product["category"])
          }
        >
          <option value="hot">☕ Sıcak Kahveler</option>
          <option value="cold">🧊 Soğuk Kahveler</option>
          <option value="dessert">🧇 Waffle & Tatlı</option>
          <option value="snack">🥐 Atıştırmalıklar</option>
          <option value="drink">🥤 Soğuk İçecekler</option>
          <option value="vitamin">🍊 Vitamin Bar</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-amber-500 py-3 font-bold text-black transition hover:bg-amber-400 disabled:opacity-50"
        >
          {loading ? "Kaydediliyor..." : "Ürünü Kaydet"}
        </button>
      </form>
    </div>
  );
}