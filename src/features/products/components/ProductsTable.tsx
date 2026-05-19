import React from 'react';
import type { Product } from '../types/productModels';

interface ProductsTableProps {
    products: Product[];
    onRowClick?: (productId: number) => void;
}

export const ProductsTable: React.FC<ProductsTableProps> = React.memo(
    ({ products, onRowClick }) => {
        if (products.length === 0) {
            return (
                <div className="rounded border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
                    No products found.
                </div>
            );
        }

        return (
            <div className="overflow-x-auto rounded border border-slate-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-2 text-left font-medium text-slate-700">
                                Name
                            </th>
                            <th className="px-4 py-2 text-left font-medium text-slate-700">
                                Brand
                            </th>
                            <th className="px-4 py-2 text-left font-medium text-slate-700">
                                Category
                            </th>
                            <th className="px-4 py-2 text-right font-medium text-slate-700">
                                Price
                            </th>
                            <th className="px-4 py-2 text-right font-medium text-slate-700">
                                Rating
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {products.map(product => (
                            <tr
                                key={product.id}
                                className={onRowClick ? 'cursor-pointer hover:bg-slate-50' : ''}
                                onClick={() => onRowClick?.(product.id)}
                            >
                                <td className="px-4 py-2">{product.name}</td>
                                <td className="px-4 py-2">{product.brand}</td>
                                <td className="px-4 py-2">{product.category}</td>
                                <td className="px-4 py-2 text-right">
                                    ${product.price.toFixed(2)}
                                    {product.isExpensive && (
                                        <span className="ml-1 rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-600">
                                            Premium
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-2 text-right">
                                    {product.rating.toFixed(1)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    },
);
ProductsTable.displayName = 'ProductsTable';