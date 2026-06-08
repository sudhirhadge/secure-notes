import useAuthStore from '@/store/authStore';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoute: React.FC = () => {
    // const { isAuthenticated } = useAuth();
    const user = useAuthStore(s => s.user)
    const location = useLocation();
    if (!user) {
        // Preserve the attempted URL so we can redirect back after login
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
};