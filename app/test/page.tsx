import { getProducts } from "@/services/productService";

export default async function TestPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl mb-8">Firebase Test</h1>

      {products.map((product) => (
        <div
          key={product.id}
          className="border border-zinc-700 rounded-xl p-4 mb-4"
        >
          <h2 className="text-xl font-bold">
            {product.name}
          </h2>

          <p>{product.description}</p>

          <p className="text-amber-500">
            {product.price} ₺
          </p>
        </div>
      ))}
    </main>
  );
}