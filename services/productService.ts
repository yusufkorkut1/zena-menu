import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  type FieldValue,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Product } from "@/types/product";

const productsRef = collection(db, "products");

type TranslatableProductField = "nameEn" | "descriptionEn";

type ProductUpdateOptions = {
  deleteFields?: TranslatableProductField[];
};

type ProductUpdatePayload =
  Partial<Omit<Product, TranslatableProductField>> &
  Partial<Record<TranslatableProductField, string | FieldValue>> & {
    updatedAt: number;
  };

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

export async function getFeaturedProduct(): Promise<Product | null> {
  const q = query(
    productsRef,
    where("isFeatured", "==", true),
    limit(1)
  );

  const snapshot = await getDocs(q);
  const docItem = snapshot.docs[0];

  if (!docItem) {
    return null;
  }

  const product = {
    id: docItem.id,
    ...(docItem.data() as Omit<Product, "id">),
  };

  if (product.available !== true) {
    return null;
  }

  return product;
}

export async function addProduct(
  product: Omit<Product, "id">
) {
  const now = Date.now();

  if (product.isFeatured) {
    const featuredSnapshot = await getDocs(
      query(productsRef, where("isFeatured", "==", true))
    );
    const batch = writeBatch(db);
    const productRef = doc(productsRef);

    featuredSnapshot.docs.forEach((docItem) => {
      batch.update(docItem.ref, {
        isFeatured: false,
        updatedAt: now,
      });
    });

    batch.set(productRef, {
      ...product,
      createdAt: now,
      updatedAt: now,
    });

    await batch.commit();

    return productRef;
  }

  return await addDoc(productsRef, {
    ...product,
    createdAt: now,
    updatedAt: now,
  });
}

export async function updateProduct(
  id: string,
  product: Partial<Product>,
  options?: ProductUpdateOptions
) {
  const productRef = doc(db, "products", id);
  const now = Date.now();
  const updateData: ProductUpdatePayload = {
    ...product,
    updatedAt: now,
  };

  options?.deleteFields?.forEach((field) => {
    updateData[field] = deleteField();
  });

  if (product.isFeatured) {
    const featuredSnapshot = await getDocs(
      query(productsRef, where("isFeatured", "==", true))
    );
    const batch = writeBatch(db);

    featuredSnapshot.docs.forEach((docItem) => {
      if (docItem.id !== id) {
        batch.update(docItem.ref, {
          isFeatured: false,
          updatedAt: now,
        });
      }
    });

    batch.update(productRef, updateData);

    await batch.commit();
    return;
  }

  await updateDoc(productRef, updateData);
}

export async function deleteProduct(id: string) {
  const productRef = doc(db, "products", id);

  await deleteDoc(productRef);
}
