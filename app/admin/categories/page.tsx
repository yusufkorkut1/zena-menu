import Link from "next/link";
import { CATEGORIES, getCategoryLabel } from "@/constants/categories";

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-10">

        <Link
          href="/admin"
          className="text-amber-500 hover:text-amber-400"
        >
          ← Admin Paneli
        </Link>

        <h1 className="text-4xl font-bold text-amber-500 mt-6 mb-10">
          Kategoriler
        </h1>

        <div className="space-y-4">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 flex items-center justify-between"
            >
              <span className="text-xl font-medium">
                {getCategoryLabel(category)}
              </span>

              <span className="text-gray-400">
                {category.id}
              </span>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
