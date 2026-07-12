import Hero from "@/components/Hero";
import Background from "@/components/Background";
import CategoryCard from "@/components/CategoryCard";
import Footer from "@/components/Footer";
import { CATEGORIES, getCategoryLabel } from "@/constants/categories";

export default function Home() {
  return (
    <>
      <Background />

      <main className="flex min-h-screen items-center justify-center px-5 py-10">

        <div className="w-full max-w-md">

          <Hero />

          <div className="space-y-3">

            {CATEGORIES.map((category) => (

              <CategoryCard
                key={category.id}
                title={getCategoryLabel(category)}
                href={`/menu/${category.id}`}
              />

            ))}

          </div>

          <Footer />

        </div>

      </main>
    </>
  );
}
