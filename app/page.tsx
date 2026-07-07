import Hero from "@/components/Hero";
import Background from "@/components/Background";
import CategoryCard from "@/components/CategoryCard";
import Footer from "@/components/Footer";

const categories = [
  {
    title: "☕ Sıcak Kahveler",
    href: "/menu/hot",
  },
  {
    title: "🧊 Soğuk Kahveler",
    href: "/menu/cold",
  },
  {
    title: "🧇 Waffle & Tatlı",
    href: "/menu/dessert",
  },
  {
    title: "🥐 Atıştırmalıklar",
    href: "/menu/snack",
  },
  {
    title: "🥤 Soğuk İçecekler",
    href: "/menu/drink",
  },
  {
    title: "🍊 Vitamin Bar",
    href: "/menu/vitamin",
  },
];

export default function Home() {
  return (
    <>
      <Background />

      <main className="min-h-screen flex items-center justify-center px-6">

        <div className="w-full max-w-md">

          <Hero />

          <div className="space-y-4">

            {categories.map((category) => (

              <CategoryCard
                key={category.title}
                title={category.title}
                href={category.href}
              />

            ))}

          </div>

          <Footer />

        </div>

      </main>
    </>
  );
}