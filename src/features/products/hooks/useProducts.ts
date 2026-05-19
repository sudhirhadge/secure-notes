// src/features/products/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { useDebouncedValue } from '../../../shared/hooks/useDebouncedValue';
import { fetchProductsApi, type FetchProductsParams } from '../api/productsApi';
import { productsKeys } from '../query/productsKeys';
import { mapProductsListDtoToModels } from '../utils/productMappers';

export function useProducts(params: FetchProductsParams) {
    const debouncedSearch = useDebouncedValue(params.q ?? '', 400);

    const effectiveParams: FetchProductsParams = {
        ...params,
        q: debouncedSearch || undefined,
    };

    return useQuery({
        queryKey: productsKeys.list(effectiveParams),
        queryFn: () => fetchProductsApi(effectiveParams),
        placeholderData: prev => prev,
        select: dto => mapProductsListDtoToModels(dto),
    });
}