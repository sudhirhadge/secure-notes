import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Pagination } from '../../../shared/components/Pagination';
import { SkeletonLoader } from '../../../shared/components/SkeletonLoader';
import { ProductsTable } from '../components/ProductsTable';
import { ProductsToolbar } from '../components/ProductsToolbar';
import { useProducts } from '../hooks/useProducts';

const DEFAULT_PAGE_SIZE = 10;

const ProductsListPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const page = Number(searchParams.get('page') ?? '1');
    const search = searchParams.get('q') ?? '';

    const { data, isLoading, isError, error } = useProducts({
        page,
        limit: DEFAULT_PAGE_SIZE,
        q: search,
    });

    const handleSearchChange = (value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value) {
            params.set('q', value);
            params.set('page', '1');
        } else {
            params.delete('q');
            params.set('page', '1');
        }

        setSearchParams(params, { replace: true });
    };

    const handlePageChange = (nextPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', String(nextPage));
        setSearchParams(params, { replace: true });
    };

    const handleRowClick = (productId: number) => {
        navigate(`/products/${productId}`);
    };

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Products</h2>
            </div>

            <ProductsToolbar search={search} onSearchChange={handleSearchChange} />

            {isLoading && (
                <div className="mt-4">
                    <SkeletonLoader lines={6} />
                </div>
            )}

            {isError && (
                <div className="mt-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    Failed to load products. {(error as Error).message}
                </div>
            )}

            {!isLoading && data && (
                <>
                    <ProductsTable products={data.items} onRowClick={handleRowClick} />
                    <div className="mt-3">
                        <Pagination
                            page={page}
                            pageSize={data.limit}
                            total={data.total}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </>
            )}
        </section>
    );
};

export default ProductsListPage;