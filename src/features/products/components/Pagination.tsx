// src/shared/components/Pagination.tsx
import { classNames } from '@/shared/utils/classNames';
import React from 'react';

interface PaginationProps {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    page,
    pageSize,
    total,
    onPageChange,
}) => {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const canPrev = page > 1;
    const canNext = page < totalPages;

    return (
        <div className="flex items-center justify-between text-xs text-slate-600">
            <span>
                Page {page} of {totalPages} • {total} items
            </span>
            <div className="flex gap-2">
                <button
                    type="button"
                    className={classNames(
                        'rounded border px-2 py-1',
                        canPrev ? 'border-slate-300' : 'border-slate-200 text-slate-300',
                    )}
                    disabled={!canPrev}
                    onClick={() => canPrev && onPageChange(page - 1)}
                >
                    Previous
                </button>
                <button
                    type="button"
                    className={classNames(
                        'rounded border px-2 py-1',
                        canNext ? 'border-slate-300' : 'border-slate-200 text-slate-300',
                    )}
                    disabled={!canNext}
                    onClick={() => canNext && onPageChange(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};