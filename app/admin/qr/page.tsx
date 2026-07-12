"use client";

import { useState } from "react";
import Link from "next/link";

const MENU_URL = "https://zena-menu.vercel.app/";
const QR_URL =
  "https://api.qrserver.com/v1/create-qr-code/?" +
  `size=320x320&data=${encodeURIComponent(MENU_URL)}`;

export default function AdminQrPage() {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(MENU_URL);
      setCopied(true);
    } catch (error) {
      console.error(error);
      alert("Link kopyalanırken hata oluştu.");
    }
  }

  function handleOpenMenu() {
    window.open(MENU_URL, "_blank", "noopener,noreferrer");
  }

  async function handleDownload() {
    try {
      setDownloading(true);

      const response = await fetch(QR_URL);

      if (!response.ok) {
        throw new Error("QR servisi geçerli bir yanıt döndürmedi.");
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = objectUrl;
      link.download = "zena-ana-menu-qr.png";
      link.click();

      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    } catch (error) {
      console.error(error);
      alert("QR kod indirilirken hata oluştu.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 py-10">

        <Link
          href="/admin"
          className="text-amber-500 hover:text-amber-400"
        >
          ← Admin Paneli
        </Link>

        <section className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 text-center sm:p-8">
          <h1 className="text-4xl font-bold text-amber-500">
            ZENA Ana Menü QR
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-gray-400">
            Müşteriler bu QR kodu okutarak tüm menü kategorilerine ulaşabilir.
          </p>

          <div className="mx-auto mt-8 flex max-w-sm justify-center rounded-2xl bg-white p-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={QR_URL}
              alt="ZENA ana menü QR kodu"
              className="h-80 w-80 max-w-full"
            />
          </div>

          <p className="mx-auto mt-6 break-all rounded-xl border border-amber-500/20 bg-black/40 p-4 text-sm text-gray-300">
            {MENU_URL}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-lg bg-amber-500 py-3 font-bold text-black transition hover:bg-amber-400"
            >
              {copied ? "Kopyalandı" : "Linki Kopyala"}
            </button>

            <button
              type="button"
              onClick={handleOpenMenu}
              className="rounded-lg border border-amber-500/30 bg-zinc-950 py-3 font-bold text-amber-400 transition hover:border-amber-400"
            >
              Menüyü Aç
            </button>

            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="rounded-lg bg-zinc-800 py-3 font-bold text-white transition hover:bg-zinc-700 disabled:opacity-50"
            >
              {downloading ? "İndiriliyor..." : "QR’ı İndir"}
            </button>
          </div>
        </section>

      </div>
    </main>
  );
}
