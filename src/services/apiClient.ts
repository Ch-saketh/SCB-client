import { STORAGE_KEYS } from '@/config/constants';
import { ENV } from '@/config/env';
import { ApiError, ApiResponse } from '@/types/api.types';
import { storage } from '@/utils/storage';

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private buildUrl(path: string, params?: Record<string, string | number | boolean | undefined>): string {
    const url = new URL(path.startsWith('http') ? path : `${this.baseUrl}${path}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    return url.toString();
  }

  private getAuthHeader(): Record<string, string> {
    const token = storage.get<string | null>(STORAGE_KEYS.AUTH_TOKEN, null);
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async request<T>(path: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const { params, headers, ...rest } = options;
    const url = this.buildUrl(path, params);

    const config: RequestInit = {
      ...rest,
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
        ...headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        let errorData: Partial<ApiError> = {};
        try {
          errorData = await response.json();
        } catch {
          // Response body was not JSON
        }

        const error: ApiError = {
          status: response.status,
          message: errorData.message || `Request failed with status ${response.status}`,
          code: errorData.code,
          details: errorData.details,
        };
        throw error;
      }

      return (await response.json()) as ApiResponse<T>;
    } catch (err: unknown) {
      if ((err as ApiError).status) {
        throw err;
      }
      const genericError: ApiError = {
        status: 500,
        message: err instanceof Error ? err.message : 'Unknown network error',
      };
      throw genericError;
    }
  }

  get<T>(path: string, params?: Record<string, string | number | boolean | undefined>) {
    return this.request<T>(path, { method: 'GET', params });
  }

  post<T>(path: string, body?: unknown) {
    return this.request<T>(path, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  put<T>(path: string, body?: unknown) {
    return this.request<T>(path, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  delete<T>(path: string) {
    return this.request<T>(path, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(ENV.API_BASE_URL);
