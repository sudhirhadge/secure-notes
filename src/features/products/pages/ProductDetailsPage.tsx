import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SkeletonLoader } from '../../../shared/components/SkeletonLoader';
import { ProductCard } from '../components/ProductCard';
import { useProduct } from '../hooks/useProduct';
import { useUpdateProduct } from '../hooks/useUpdateProduct';

const ProductDetailsPage: React.FC = () => {
    const navigate = useNavigate();
    const { data: product, isLoading, isError, error } = useProduct();
    const updateProductMutation = useUpdateProduct();

    const handleBack = () => navigate(-1);

    const handleSave = (patch: { title?: string; price?: number }) => {
        if (!product) return;

        updateProductMutation.mutate({
            id: product.id,
            patch,
        });
    };

    if (isLoading) {
        return (
            <section className="space-y-4">
                <button
                    type="button"
                    className="text-sm text-blue-600 underline"
                    onClick={handleBack}
                >
                    Back
                </button>
                <SkeletonLoader lines={5} />
            </section>
        );
    }

    if (isError || !product) {
        return (
            <section className="space-y-4">
                <button
                    type="button"
                    className="text-sm text-blue-600 underline"
                    onClick={handleBack}
                >
                    Back
                </button>
                <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    Failed to load product. {(error as Error)?.message ?? 'Not found.'}
                </div>
            </section>
        );
    }

    return (
        <section className="space-y-4">
            <button
                type="button"
                className="text-sm text-blue-600 underline"
                onClick={handleBack}
            >
                Back
            </button>

            <ProductCard
                product={product}
                isUpdating={updateProductMutation.isPending}
                onSave={handleSave}
            />
        </section>
    );
};

export default ProductDetailsPage;