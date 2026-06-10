export const routes = {
    root: '/',
    user: {
        profile: '/profile',
    },
    auth: {
        login: '/login',
        register: '/register',
    },
    products: {
        base: '/products',
        list: '/products',
        detail: '/products/:id',
    },
    notes: {
        notes: '/notes',
    },
} as const;