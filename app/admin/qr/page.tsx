"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CATEGORIES, getCategoryLabel } from "@/constants/categories";

export default function AdminQrPage() {
  const [origin, setOrigin] = useState("");
  const [copiedCategory, setCopiedCategory] = useState("");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setOrigin(window.location.origin);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  async function handleCopy(url: string, categoryId: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedCategory(categoryId);
    } catch (error) {
      console.error(error);
      alert("Link kopyalanırken hata oluştu.");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">

        <Link
          href="/admin"
          className="text-amber-500 hover:text-amber-400"
        >
          ← Admin Paneli
        </Link>

        <h1 className="text-4xl font-bold text-amber-500 mt-6">
          QR Kodlar
        </h1>

        <p className="text-gray-400 mt-2 mb-10">
          Kategori menü linklerini ve QR kodlarını görüntüle.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => {
            const menuUrl = origin
              ? `${origin}/menu/${category.id}`
              : `/menu/${category.id}`;
            const qrUrl =
              "https://api.qrserver.com/v1/create-qr-code/?" +
              `size=240x240&data=${encodeURIComponent(menuUrl)}`;

            return (
              <div
                key={category.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <h2 className="text-2xl font-semibold text-white">
                  {getCategoryLabel(category)}
                </h2>

                <p className="mt-3 break-all text-sm text-gray-400">
                  {menuUrl}
                </p>

                <div className="mt-5 flex justify-center rounded-xl bg-white p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={qrUrl}
                    alt={`${getCategoryLabel(category)} QR kodu`}
                    className="h-60 w-60"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(menuUrl, category.id)}
                  disabled={!origin}
                  className="mt-5 w-full rounded-lg bg-amber-500 py-3 font-bold text-black transition hover:bg-amber-400 disabled:opacity-50"
                >
                  {copiedCategory === category.id
                    ? "Kopyalandı"
                    : "Linki Kopyala"}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
