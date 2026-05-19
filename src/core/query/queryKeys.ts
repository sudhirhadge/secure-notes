export const productsKeys = {
    all: ['products'] as const,
    lists: () => [...productsKeys.all, 'list'] as const,
    list: (params: { page: number; limit: number; q?: string }) =>
        [...productsKeys.lists(), { page: params.page, limit: params.limit, q: params.q ?? '' }] as const,
    details: () => [...productsKeys.all, 'detail'] as const,
    detail: (id: number | string) => [...productsKeys.details(), id] as const,
};

/*
Big architectural benefit

This pattern helps with:

centralized cache management
no duplicate keys
safer invalidation
scalable large apps
autocomplete support
fewer typo bugs
*/