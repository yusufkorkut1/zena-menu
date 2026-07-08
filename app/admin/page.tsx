import Link from "next/link";
import { CATEGORIES, getCategoryLabel } from "@/constants/categories";
import LogoutButton from "@/components/admin/LogoutButton";
import { getProducts } from "@/services/productService";

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
  {
    title: "📱 QR Kodlar",
    description: "Menü QR kodlarını görüntüle",
    href: "/admin/qr",
  },
];

export default async function AdminPage() {
  const products = await getProducts();

  const totalProducts = products.length;
  const activeProducts = products.filter((product) => product.available).length;
  const productsWithImage = products.filter((product) => product.image).length;
  const latestProducts = [...products]
    .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
    .slice(0, 5);

  const stats = [
    {
      title: "Toplam Ürün",
      value: totalProducts,
    },
    {
      title: "Aktif Ürün",
      value: activeProducts,
    },
    {
      title: "Fotoğraflı Ürün",
      value: productsWithImage,
    },
    {
      title: "Kategori Sayısı",
      value: CATEGORIES.length,
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-amber-500">
              ZENA ADMIN
            </h1>

            <p className="text-gray-400 mt-2 mb-10">
              QR Menü Yönetim Paneli
            </p>
          </div>

          <LogoutButton />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
            >
              <p className="text-sm text-gray-400">
                {stat.title}
              </p>

              <p className="mt-3 text-3xl font-bold text-amber-500">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <section className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-5 text-2xl font-semibold text-white">
            Son Eklenen Ürünler
          </h2>

          {latestProducts.length === 0 ? (
            <p className="text-gray-400">
              Henüz ürün bulunmuyor.
            </p>
          ) : (
            <div className="space-y-4">
              {latestProducts.map((product) => {
                const category = CATEGORIES.find(
                  (item) => item.id === product.category
                );

                return (
                  <div
                    key={product.id}
                    className="flex items-center justify-between gap-4 border-b border-zinc-800 pb-4 last:border-b-0 last:pb-0"
                  >
                    <div>
                      <h3 className="font-semibold text-white">
                        {product.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-400">
                        {category ? getCategoryLabel(category) : product.category}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-amber-500">
                        {product.price} ₺
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {product.available ? "Aktif" : "Pasif"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <div className="grid md:grid-cols-3 gap-6">

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
