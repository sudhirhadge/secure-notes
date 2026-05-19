import { routes } from '@/core/constants/routes';
import React from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import { ErrorBoundaryRoot } from '../core/errors/ErrorBoundary';
import { AppLayout } from './AppLayout';

const ProductsListPage = React.lazy(
    () => import('@/features/products/pages/ProductsListPage'),
);
const ProductDetailsPage = React.lazy(
    () => import('@/features/products/pages/ProductDetailsPage'),
);

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path={routes.root}
            element={<AppLayout />}
            errorElement={<ErrorBoundaryRoot />}
        >
            <Route
                index
                element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <ProductsListPage />
                    </React.Suspense>
                }
            />
            <Route
                path={routes.products.list}
                element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <ProductsListPage />
                    </React.Suspense>
                }
            />
            <Route
                path={routes.products.detail}
                element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <ProductDetailsPage />
                    </React.Suspense>
                }
            />
        </Route>,
    ),
);

export const AppRouter: React.FC = () => <RouterProvider router={router} />;