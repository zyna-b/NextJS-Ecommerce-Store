import type { Color } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`;

// This function fetches colors from the API
// and returns them as a Promise of Color array.

const getColors = async (): Promise<Color[]> => {
    try {
        const res = await fetch(URL);
        
        if (!res.ok) {
            throw new Error('Failed to fetch colors');
        }
        
        return res.json();
    } catch (error) {
        console.log('Colors fetch error:', error);
        // Return empty array as fallback
        return [];
    }
}

export default getColors;