export const routes = {
    root: '/',
    auth: {
        login: '/login',
        register: '/register',
    },
    products: {
        base: '/products',
        list: '/products',
        detail: '/products/:id',
    },
} as const;