import Link from "next/link";

const cards = [
  {
    title: "📦 Ürün Yönetimi",
    description: "Ürün ekle, düzenle ve sil",
    href: "/admin/products",
  },
  {
    title: "☕ Kategori Yönetimi",
    description: "Kategorileri düzenle",
    href: "/admin/categories",
  },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold text-amber-500">
          ZENA ADMIN
        </h1>

        <p className="text-gray-400 mt-2 mb-10">
          QR Menü Yönetim Paneli
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 hover:border-amber-500 transition"
            >
              <h2 className="text-2xl font-semibold mb-2">
                {card.title}
              </h2>

              <p className="text-gray-400">
                {card.description}
              </p>
            </Link>
          ))}

        </div>
      </div>
    </main>
  );
}