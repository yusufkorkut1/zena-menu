import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Product } from "@/types/product";

const productsRef = collection(db, "products");

export async function getProducts(): Promise<Product[]> {
  const snapshot = await getDocs(productsRef);

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...(docItem.data() as Omit<Product, "id">),
  }));
}

export async function getProductsByCategory(
  category: Product["category"]
): Promise<Product[]> {
  const q = query(
    productsRef,
    where("category", "==", category),
    where("available", "==", true)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...(docItem.data() as Omit<Product, "id">),
  }));
}

export async function addProduct(
  product: Omit<Product, "id">
) {
  return await addDoc(productsRef, {
    ...product,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
}

export async function updateProduct(
  id: string,
  product: Partial<Product>
) {
  const productRef = doc(db, "products", id);

  await updateDoc(productRef, {
    ...product,
    updatedAt: Date.now(),
  });
}

export async function deleteProduct(id: string) {
  const productRef = doc(db, "products", id);

  await deleteDoc(productRef);
}