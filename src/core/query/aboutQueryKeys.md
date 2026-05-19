This is a **query key factory pattern** commonly used with [TanStack Query (React Query)](https://tanstack.com/query/latest?utm_source=chatgpt.com).

It helps you create **consistent, type-safe cache keys** for API data.

Example usage:

```ts
useQuery({
  queryKey: productsKeys.list({ page: 1, limit: 10 }),
  queryFn: fetchProducts,
});
```

Instead of manually writing:

```ts
['products', 'list', { page: 1, limit: 10 }]
```

everywhere.

---

# Why this pattern exists

Without this:

```ts
useQuery({
  queryKey: ['products', 'list'],
});
```

Later somewhere else:

```ts
queryClient.invalidateQueries({
  queryKey: ['product'], // typo
});
```

or

```ts
['products', 'lists'] // inconsistent
```

You create bugs because cache keys must match exactly.

So this centralizes keys in one place.

---

# What each function means

## Root key

```ts
all: ['products'] as const,
```

Base namespace for everything related to products.

Used for:

```ts
queryClient.invalidateQueries({
  queryKey: productsKeys.all,
});
```

This invalidates ALL product-related queries.

---

## Lists group

```ts
lists: () => [...productsKeys.all, 'list'] as const,
```

Creates:

```ts
['products', 'list']
```

Represents all product list queries.

Useful for invalidating only lists:

```ts
queryClient.invalidateQueries({
  queryKey: productsKeys.lists(),
});
```

---

## Specific paginated/filter list

```ts
list: (params) => [
  ...productsKeys.lists(),
  { page, limit, q }
]
```

Creates unique cache keys like:

```ts
['products', 'list', { page: 1, limit: 10, q: 'phone' }]
```

Now React Query caches separately for:

* page 1
* page 2
* different searches

Otherwise all data would overwrite each other.

---

## Detail group

```ts
details: () => [...productsKeys.all, 'detail'] as const,
```

Creates:

```ts
['products', 'detail']
```

---

## Single product detail

```ts
detail: (id) => [...productsKeys.details(), id] as const,
```

Creates:

```ts
['products', 'detail', 25]
```

Each product gets its own cache entry.

---

# Why `as const` is important

```ts
['products']
```

normally becomes:

```ts
string[]
```

But:

```ts
['products'] as const
```

becomes readonly literal type:

```ts
readonly ['products']
```

This gives better TypeScript inference and matches React Query expectations.

---

# Big architectural benefit

This pattern helps with:

* centralized cache management
* no duplicate keys
* safer invalidation
* scalable large apps
* autocomplete support
* fewer typo bugs

Very common in scalable React apps using:

* [TanStack Query](https://tanstack.com/query/latest?utm_source=chatgpt.com)
* feature-based architecture
* API caching layers
