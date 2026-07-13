"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES, getCategoryLabel } from "@/constants/categories";
import { storage } from "@/lib/firebase";
import { addProduct } from "@/services/productService";
import type { Product } from "@/types/product";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export default function ProductForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isPopular, setIsPopular] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const [category, setCategory] =
    useState<Product["category"]>("hot");

  const [loading, setLoading] = useState(false);

  async function uploadProductImage(file: File): Promise<string> {
    const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const imageRef = ref(storage, `products/${Date.now()}-${safeFileName}`);
    const uploadTask = uploadBytesResumable(imageRef, file);

    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          setUploadProgress(progress);
        },
        reject,
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(resolve)
            .catch(reject);
        }
      );
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name || !description || !price) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      setLoading(true);
      setUploadProgress(imageFile ? 0 : null);

      const imageUrl = imageFile
        ? await uploadProductImage(imageFile)
        : undefined;
      const trimmedNameEn = nameEn.trim();
      const trimmedDescriptionEn = descriptionEn.trim();

      const productData: Omit<Product, "id"> = {
        name,
        description,
        price: Number(price) || 0,
        category,
        available: true,
        isPopular,
        isFeatured,
        ...(trimmedNameEn ? { nameEn: trimmedNameEn } : {}),
        ...(trimmedDescriptionEn
          ? { descriptionEn: trimmedDescriptionEn }
          : {}),
      };

      if (imageUrl) {
        productData.image = imageUrl;
      }

      await addProduct(productData);

      setName("");
      setNameEn("");
      setDescription("");
      setDescriptionEn("");
      setPrice("");

      router.refresh();

      setImageFile(null);
      setUploadProgress(null);
      setCategory("hot");
      setIsPopular(false);
      setIsFeatured(false);

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

        <input
          className="w-full rounded-lg bg-zinc-800 p-3 outline-none"
          placeholder="İngilizce ürün adı"
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
        />

        <textarea
          className="w-full rounded-lg bg-zinc-800 p-3 outline-none"
          placeholder="Açıklama"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <textarea
          className="w-full rounded-lg bg-zinc-800 p-3 outline-none"
          placeholder="İngilizce açıklama"
          value={descriptionEn}
          onChange={(e) => setDescriptionEn(e.target.value)}
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
          {CATEGORIES.map((categoryItem) => (
            <option key={categoryItem.id} value={categoryItem.id}>
              {getCategoryLabel(categoryItem)}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-3 rounded-lg bg-zinc-800 p-3 text-sm text-gray-200">
          <input
            type="checkbox"
            checked={isPopular}
            disabled={loading}
            onChange={(e) => setIsPopular(e.target.checked)}
            className="h-4 w-4 accent-amber-500"
          />

          <span>
            Popüler ürün
          </span>
        </label>

        <label className="flex items-center gap-3 rounded-lg bg-zinc-800 p-3 text-sm text-gray-200">
          <input
            type="checkbox"
            checked={isFeatured}
            disabled={loading}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="h-4 w-4 accent-amber-500"
          />

          <span>
            Günün önerisi
          </span>
        </label>

        <input
          type="file"
          accept="image/*"
          disabled={loading}
          className="w-full rounded-lg bg-zinc-800 p-3 outline-none disabled:opacity-50"
          onChange={(e) => {
            setImageFile(e.target.files?.[0] ?? null);
            setUploadProgress(null);
          }}
        />

        {imageFile && (
          <p className="text-sm text-gray-400">
            Seçilen resim: {imageFile.name}
          </p>
        )}

        {uploadProgress !== null && (
          <div className="space-y-2">
            <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-amber-500 transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>

            <p className="text-sm text-gray-400">
              Yükleniyor: %{uploadProgress}
            </p>
          </div>
        )}

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
