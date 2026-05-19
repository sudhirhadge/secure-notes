import React from 'react';
import { QueryProvider } from './QueryProvider';

interface AppProvidersProps {
    children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
    return <QueryProvider>{children}</QueryProvider>;
};