// src/shared/components/SkeletonLoader.tsx
import React from 'react';
import { classNames } from '../../../shared/utils/classNames';

interface SkeletonLoaderProps {
    lines?: number;
    className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
    lines = 3,
    className,
}) => {
    return (
        <div className={classNames('animate-pulse space-y-2', className)}>
            {Array.from({ length: lines }).map((_, index) => (
                <div
                    key={index}
                    className="h-4 rounded bg-slate-200"
                    style={{ width: `${80 - index * 5}%` }}
                />
            ))}
        </div>
    );
};