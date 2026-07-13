import { notFound } from "next/navigation";
import MenuCategoryView from "@/components/MenuCategoryView";
import { CATEGORIES } from "@/constants/categories";
import { getProductsByCategory } from "@/services/productService";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { category } = await params;
  const categoryData = CATEGORIES.find((item) => item.id === category);

  if (!categoryData) {
    notFound();
  }

  const products = await getProductsByCategory(categoryData.id);

  return (
    <main className="min-h-screen bg-black px-5 py-6 text-white">
      <MenuCategoryView category={categoryData} products={products} />
    </main>
  );
}
