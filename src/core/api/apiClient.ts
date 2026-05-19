import { ApiError } from '../errors/ApiError';

const BASE_URL = 'https://dummyjson.com';

interface RequestConfig<TBody = unknown> {
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
    url: string;
    queryParams?: Record<string, string | number | boolean | undefined>;
    body?: TBody;
}

export async function apiClient<TResponse, TBody = unknown>(
    config: RequestConfig<TBody>,
): Promise<TResponse> {
    const url = buildUrl(config.url, config.queryParams);

    const response = await fetch(url, {
        method: config.method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: config.body ? JSON.stringify(config.body) : undefined,
    });

    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json') ?? false;
    const raw = isJson ? await response.json() : await response.text();

    if (!response.ok) {
        const message =
            typeof raw === 'object' && raw && 'message' in raw
                ? String((raw as { message: unknown }).message)
                : 'Request failed';
        throw new ApiError(message, response.status);
    }

    return raw as TResponse;
}

function buildUrl(
    path: string,
    queryParams?: Record<string, string | number | boolean | undefined>,
): string {
    const url = new URL(path, BASE_URL);
    if (queryParams) {
        Object.entries(queryParams).forEach(([key, value]) => {
            if (value !== undefined) {
                url.searchParams.set(key, String(value));
            }
        });
    }
    return url.toString();
}