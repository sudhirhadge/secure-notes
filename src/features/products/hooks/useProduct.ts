// src/features/products/hooks/useProduct.ts
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchProductApi } from '../api/productsApi';
import { productsKeys } from '../query/productsKeys';
import { mapProductDtoToModel } from '../utils/productMappers';

export function useProduct(initialId?: number) {
    const params = useParams<{ id: string }>();
    const id = initialId ?? Number(params.id);
    const enabled = Number.isFinite(id) && id > 0;

    return useQuery({
        queryKey: productsKeys.detail(id),
        queryFn: () => fetchProductApi(id),
        enabled,
        select: dto => mapProductDtoToModel(dto),
    });
}