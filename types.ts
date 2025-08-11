export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;

}

export interface Category {
    id: string;
    name: string;
    billboard: Billboard;
}

export interface Product {
    size: any;
    color: any;
    id: string;
    category: Category;
    name: string;
    price: string;
    quantity: number;
    isFeatured: boolean;
    images: Image[];
    description: string;
    productSizes: { size: Size }[];
    productColors: { color: Color }[];
}

export interface Image {
    id: string;
    url: string;
}
export interface Size {
    id: string;
    name: string;
    value: string;
}
export interface Color {
    id: string;
    name: string;
    value: string;
}

