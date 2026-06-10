import ProfilePage from '@/features/notes/pages/ProfilePage';
import React from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
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
const SignupPage = React.lazy(
    () => import('@/features/auth/pages/SignupPage'),
);
const NotesPage = React.lazy(
    () => import('@/features/notes/pages/NotesPage'),
);

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AppLayout />} errorElement={<ErrorBoundaryRoot />}>
            <Route
                path={routes.auth.login}
                element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                        {/* <LoginPage /> */}
                        <LoginPage />
                    </React.Suspense>
                }
            />
            <Route
                path={routes.auth.register}
                element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                        {/* <RegisterPage /> */}
                        <SignupPage />
                    </React.Suspense>
                }
            />

            {/* Protected area */}
            <Route element={<ProtectedRoute />}>
                <Route
                    index
                    // path={routes.notes.notes}
                    element={
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <NotesPage />
                        </React.Suspense>
                    }
                /> {/* index -  Default child route */}
                <Route
                    path={routes.notes.notes}
                    element={
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <NotesPage />
                        </React.Suspense>
                    }
                />

                <Route
                    path={routes.user.profile}
                    element={
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <ProfilePage />
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
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/notes" replace />} />
        </Route>,
    ),
);

export const AppRouter: React.FC = () => <RouterProvider router={router} />;