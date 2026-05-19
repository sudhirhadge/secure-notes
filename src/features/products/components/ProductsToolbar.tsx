import React, { useCallback } from 'react';

interface ProductsToolbarProps {
    search: string;
    onSearchChange: (value: string) => void;
}

export const ProductsToolbar: React.FC<ProductsToolbarProps> = React.memo(
    ({ search, onSearchChange }) => {
        const handleChange = useCallback(
            (event: React.ChangeEvent<HTMLInputElement>) => {
                onSearchChange(event.target.value);
            },
            [onSearchChange],
        );

        return (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <input
                    type="text"
                    className="w-full rounded border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:max-w-xs"
                    placeholder="Search products..."
                    value={search}
                    onChange={handleChange}
                />
            </div>
        );
    },
);
ProductsToolbar.displayName = 'ProductsToolbar';