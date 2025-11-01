import axios, { type InternalAxiosRequestConfig } from 'axios';

export interface ApiResponse<T = unknown> {
  status: number;
  message: string;
  data: T;
}

export const httpBackend = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshTokenPromise: Promise<unknown> | null = null;

httpBackend.interceptors.response.use(
  (response) => {
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const url = error.config?.url || '';
      if (status === 401 && url !== '/users/refresh') {
        return Promise.reject(error);
      }
    } else {
      console.error('[Unexpected Error]', error);
    }
    return Promise.reject(error);
  },
);

httpBackend.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (axios.isAxiosError(error) && error.response) {
      const url = originalRequest.url || '';

      if (error.response.status === 401 && !originalRequest._retry && url !== '/users/refresh') {
        originalRequest._retry = true;

        if (!refreshTokenPromise) {
          refreshTokenPromise = httpBackend.post('/users/refresh').finally(() => {
            refreshTokenPromise = null;
          });
        }

        try {
          await refreshTokenPromise;
          return httpBackend(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  },
);
