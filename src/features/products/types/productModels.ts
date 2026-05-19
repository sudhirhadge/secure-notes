// src/features/products/types/productModels.ts
export interface Product {
    id: number;
    name: string;
    summary: string;
    price: number;
    rating: number;
    brand: string;
    category: string;
    isExpensive: boolean;
    thumbnailUrl: string;
}