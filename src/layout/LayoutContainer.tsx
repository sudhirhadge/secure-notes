// src/shared/components/LayoutContainer.tsx
import React from 'react';

interface LayoutContainerProps {
    children: React.ReactNode;
}

export const LayoutContainer: React.FC<LayoutContainerProps> = ({ children }) => {
    return <div className="mx-auto max-w-6xl px-4 flex flex-col">{children}</div>;
};