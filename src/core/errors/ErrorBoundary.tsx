import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export const ErrorBoundaryRoot: React.FC = () => {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <div className="mx-auto max-w-3xl py-10">
                <h2 className="mb-2 text-xl font-semibold">Something went wrong</h2>
                <p className="text-sm text-slate-600">
                    {error.status} – {error.statusText}
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl py-10">
            <h2 className="mb-2 text-xl font-semibold">Unexpected error</h2>
            <p className="text-sm text-slate-600">Please try again later.</p>
        </div>
    );
};