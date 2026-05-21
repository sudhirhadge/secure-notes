import { LayoutContainer } from '@/shared/components/LayoutContainer';
import React from 'react';
import { Outlet } from 'react-router-dom';

// Suppose header , navbar needs a data which is also eeed in say feature1 (say homepage) and feature2 (say product details page), then we can fetch that data here in AppLayout and pass it down via context or props to header, navbar and also to feature1 and feature2. 
// This way we avoid fetching the same data multiple times in different features and also we have a single source of truth for that data in our app.
// We might fetch it via custom hooks which internally uses react-query or any data fetching library, so that we can benefit from caching, deduplication and other features of that library.

// We can keep that custom hoook inside src/shared/hooks and name it useAppData or something like that, and then use it in AppLayout to fetch the data and pass it down to header, navbar and also to feature1 and feature2 via context or props.
// Or if the data is featur1 specific then we can keep that custom hook inside feature1/hooks and (use it in feature1 and also pass it down to header and navbar via context or props if they need it.) OR 
// import inside App.js from feature/hooks and flow the data.

// the main iddea is that the placement oof data fething should depend on how data flows and not on where the component is located in the file structure. We should place the data fetching logic in a way that it can be easily shared and accessed by all the components that need it, without having to fetch it multiple times or pass it down through too many layers of components.
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