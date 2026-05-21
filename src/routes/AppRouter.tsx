import React from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import { routes } from '../core/constants/routes';
import { ErrorBoundaryRoot } from '../core/errors/ErrorBoundary';
import { AppLayout } from './AppLayout';
import { ProtectedRoute } from './ProtectedRoute';

const ProductsListPage = React.lazy(
    () => import('../features/products/pages/ProductsListPage'),
);
const ProductDetailsPage = React.lazy(
    () => import('../features/products/pages/ProductDetailsPage'),
);
const LoginPage = React.lazy(
    () => import('@/features/auth/pages/LoginPage'),
);
const RegisterPage = React.lazy(
    () => import('@/features/auth/pages/RegisterPage'),
);

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AppLayout />} errorElement={<ErrorBoundaryRoot />}>
            <Route
                path={routes.auth.login}
                element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <LoginPage />
                    </React.Suspense>
                }
            />
            <Route
                path={routes.auth.register}
                element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <RegisterPage />
                    </React.Suspense>
                }
            />

            {/* Protected area */}
            <Route element={<ProtectedRoute />}>
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
            </Route>
        </Route>,
    ),
);

export const AppRouter: React.FC = () => <RouterProvider router={router} />;