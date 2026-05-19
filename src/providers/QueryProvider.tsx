import { queryClient } from '@/core/query/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

interface QueryProviderProps {
    children: React.ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => (
    <QueryClientProvider client={queryClient}>
        {children}
        {/* {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />} */}
    </QueryClientProvider>
);