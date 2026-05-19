// src/features/products/api/productsApi.ts
import { apiClient } from '../../../core/api/apiClient';
import type { ProductDto, ProductsListDto } from '../types/productDto';

export interface FetchProductsParams {
    page: number;
    limit: number;
    q?: string;
}

const PRODUCTS_BASE_PATH = '/products';

export async function fetchProductsApi(params: FetchProductsParams) {
    const skip = (params.page - 1) * params.limit;
    const isSearch = Boolean(params.q?.trim());
    const url = isSearch ? `${PRODUCTS_BASE_PATH}/search` : PRODUCTS_BASE_PATH;

    return apiClient<ProductsListDto>({
        method: 'GET',
        url,
        queryParams: {
            q: params.q,
            limit: params.limit,
            skip,
        },
    });
}

export async function fetchProductApi(id: number) {
    return apiClient<ProductDto>({
        method: 'GET',
        url: `${PRODUCTS_BASE_PATH}/${id}`,
    });
}

export interface UpdateProductPayload {
    title?: string;
    price?: number;
}

export async function updateProductApi(
    id: number,
    payload: UpdateProductPayload,
) {
    return apiClient<ProductDto, UpdateProductPayload>({
        method: 'PATCH',
        url: `${PRODUCTS_BASE_PATH}/${id}`,
        body: payload,
    });
}