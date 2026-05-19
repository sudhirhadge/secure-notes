import React from 'react';
import type { Product } from '../types/productModels';

interface ProductCardProps {
    product: Product;
    isUpdating?: boolean;
    onSave?: (patch: { title?: string; price?: number }) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    isUpdating,
    onSave,
}) => {
    const [price, setPrice] = React.useState(product.price);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSave?.({ price });
    };

    return (
        <div className="flex gap-4 rounded border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">
            <img
                src={product.thumbnailUrl}
                alt={product.name}
                className="h-32 w-32 rounded object-cover"
            />
            <div className="flex-1">
                <h2 className="mb-1 text-lg font-semibold">{product.name}</h2>
                <p className="mb-3 text-sm text-slate-600">{product.summary}</p>
                <div className="mb-2 flex flex-wrap gap-3 text-xs text-slate-600">
                    <span>Brand: {product.brand}</span>
                    <span>Category: {product.category}</span>
                    <span>Rating: {product.rating.toFixed(1)}</span>
                </div>
                <form className="mt-3 flex items-center gap-2 text-sm" onSubmit={handleSubmit}>
                    <label className="text-slate-600">Price:</label>
                    <input
                        type="number"
                        className="w-24 rounded border border-slate-300 px-2 py-1 text-right text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                    />
                    <button
                        type="submit"
                        disabled={isUpdating}
                        className="rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white shadow-sm disabled:cursor-not-allowed disabled:bg-blue-300"
                    >
                        {isUpdating ? 'Saving...' : 'Save'}
                    </button>
                </form>
            </div>
        </div>
    );
};