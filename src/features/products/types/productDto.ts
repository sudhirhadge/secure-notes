// src/features/products/types/productDto.ts
export interface ProductDto {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
}

export interface ProductsListDto {
    products: ProductDto[];
    total: number;
    skip: number;
    limit: number;
}