import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loginApi } from '../core/auth/authApi';
import type { AuthState, AuthUser } from '../core/auth/authTypes';

interface AuthContextValue extends AuthState {
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'app-auth';

function loadInitialState(): AuthState {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return { user: null, token: null };
        return JSON.parse(raw) as AuthState;
    } catch {
        return { user: null, token: null };
    }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AuthState>(() => loadInitialState());

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    const login = async (username: string, password: string) => {
        const result = await loginApi({ username, password });
        const user: AuthUser = result.user;
        setState({ user, token: result.token });
    };

    const logout = () => {
        setState({ user: null, token: null });
    };

    const value = useMemo<AuthContextValue>(
        () => ({
            ...state,
            login,
            logout,
            isAuthenticated: Boolean(state.token),
        }),
        [state],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return ctx;
}