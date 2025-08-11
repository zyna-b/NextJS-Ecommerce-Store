import type { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (id: string): Promise<Product | null> => {
  try {
    const res = await fetch(`${URL}/${id}`);

    if (!res.ok) {
      // You can log the status or throw a detailed error
      console.error(`Failed to fetch product with id ${id}. Status: ${res.status}`);
      return null;
    }

    const product: Product = await res.json();
    return product;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return null;
  }
};

export default getProduct;
