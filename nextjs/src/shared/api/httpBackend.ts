import axios, { type InternalAxiosRequestConfig } from 'axios';

export interface ApiResponse<T = unknown> {
  status: number;
  message: string;
  data: T;
}

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const httpBackend = axios.create({
  baseURL,
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
      // 401 오류는 인증 관련 정상적인 응답이므로 로그 레벨을 낮춤
      if (error.response?.status === 401) {
        // 개발 환경에서만 401 로그 출력
        if (process.env.NODE_ENV === 'development') {
          console.warn(
            '[Auth Error]',
            error.response?.status,
            error.response?.data?.message || error.message,
          );
        }
      } else {
        // 다른 오류들은 여전히 에러로 처리
        console.error(
          '[Backend API Error]',
          error.response?.status,
          error.response?.data?.message || error.message,
        );
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

      if (
        error.response.status === 401 &&
        !originalRequest._retry &&
        url !== '/users/refresh'
      ) {
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