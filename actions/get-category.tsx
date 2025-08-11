import type { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

// This function fetches a specific category by ID from the API
// and returns it as a Promise of Category object.

const getCategory = async (id: string): Promise<Category> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getCategory;
