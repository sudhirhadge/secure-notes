import { QueryClient } from '@tanstack/react-query';
import {
    QUERY_CACHE_TIME_MS,
    QUERY_RETRY_COUNT,
    QUERY_STALE_TIME_MS,
} from '../constants/query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: QUERY_STALE_TIME_MS,
            gcTime: QUERY_CACHE_TIME_MS,
            retry: QUERY_RETRY_COUNT,
            retryDelay: attempt => Math.min(1000 * 2 ** attempt, 10_000),
            refetchOnWindowFocus: false,
        },
    },
});