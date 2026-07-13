import Background from "@/components/Background";
import CustomerHome from "@/components/CustomerHome";
import { getFeaturedProduct } from "@/services/productService";

export const revalidate = 60;

export default async function Home() {
  const featuredProduct = await getFeaturedProduct();

  return (
    <>
      <Background />

      <main className="flex min-h-screen items-center justify-center px-5 py-10">
        <CustomerHome featuredProduct={featuredProduct} />
      </main>
    </>
  );
}
