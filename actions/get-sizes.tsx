import type { Size } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;

// This function fetches sizes from the API
// and returns them as a Promise of Size array.

const getSizes = async (): Promise<Size[]> => {
    try {
        const res = await fetch(URL);
        
        if (!res.ok) {
            throw new Error('Failed to fetch sizes');
        }
        
        return res.json();
    } catch (error) {
        console.log('Sizes fetch error:', error);
        // Return empty array as fallback
        return [];
    }
}

export default getSizes;