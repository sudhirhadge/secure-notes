// src/features/products/utils/productMappers.ts
import type { ProductDto, ProductsListDto } from '../types/productDto';
import type { Product } from '../types/productModels';

const EXPENSIVE_PRICE_THRESHOLD = 100;

export function mapProductDtoToModel(dto: ProductDto): Product {
    return {
        id: dto.id,
        name: dto.title,
        summary: dto.description,
        price: dto.price,
        rating: dto.rating,
        brand: dto.brand,
        category: dto.category,
        isExpensive: dto.price >= EXPENSIVE_PRICE_THRESHOLD,
        thumbnailUrl: dto.thumbnail,
    };
}

export function mapProductsListDtoToModels(dto: ProductsListDto) {
    return {
        items: dto.products.map(mapProductDtoToModel),
        total: dto.total,
        limit: dto.limit,
        skip: dto.skip,
    };
}