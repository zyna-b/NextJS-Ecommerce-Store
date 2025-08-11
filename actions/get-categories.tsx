import type { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

// This function fetches categories from the API
// and returns them as a Promise of Category array. 

const getCategories = async (): Promise<Category[]> => {
    try {
        const res = await fetch(URL);
        
        if (!res.ok) {
            throw new Error('Failed to fetch categories');
        }
        
        return res.json();
    } catch (error) {
        console.log('Categories fetch error:', error);
        // Return empty array as fallback
        return [];
    }
}

export default getCategories;