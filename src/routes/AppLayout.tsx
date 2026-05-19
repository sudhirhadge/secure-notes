import { LayoutContainer } from '@/shared/components/LayoutContainer';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const AppLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <header className="border-b bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                    <h1 className="text-lg font-semibold tracking-tight">Products Console</h1>
                </div>
            </header>
            <main className="py-6">
                <LayoutContainer>
                    <Outlet />
                </LayoutContainer>
            </main>
        </div>
    );
};