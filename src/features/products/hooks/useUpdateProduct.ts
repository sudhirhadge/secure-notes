import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProductApi, type UpdateProductPayload } from '../api/productsApi';
import { productsKeys } from '../query/productsKeys';
import type { Product } from '../types/productModels';
import { mapProductDtoToModel } from '../utils/productMappers';

interface UpdateProductVariables {
    id: number;
    patch: UpdateProductPayload;
}

interface UpdateProductContext {
    previousDetail?: Product;
}

export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation<Product, Error, UpdateProductVariables, UpdateProductContext>({
        mutationFn: async ({ id, patch }) => {
            const dto = await updateProductApi(id, patch);
            return mapProductDtoToModel(dto);
        },
        onMutate: async ({ id, patch }) => {
            await queryClient.cancelQueries({ queryKey: productsKeys.detail(id) });

            const previousDetail = queryClient.getQueryData<Product>(productsKeys.detail(id));

            if (previousDetail) {
                const nextDetail: Product = {
                    ...previousDetail,
                    name: patch.title ?? previousDetail.name,
                    price: patch.price ?? previousDetail.price,
                };

                queryClient.setQueryData(productsKeys.detail(id), nextDetail);

                queryClient.setQueriesData<{ items: Product[] }>(
                    { queryKey: productsKeys.lists() },
                    old => {
                        if (!old) return old;
                        return {
                            ...old,
                            items: old.items.map(item =>
                                item.id === id
                                    ? {
                                        ...item,
                                        name: patch.title ?? item.name,
                                        price: patch.price ?? item.price,
                                    }
                                    : item,
                            ),
                        };
                    },
                );
            }

            return { previousDetail };
        },
        onError: (_error, { id }, context) => {
            if (context?.previousDetail) {
                queryClient.setQueryData(productsKeys.detail(id), context.previousDetail);
            }
        },
        onSettled: (_data, _error, { id }) => {
            queryClient.invalidateQueries({ queryKey: productsKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: productsKeys.lists() });
        },
    });
}