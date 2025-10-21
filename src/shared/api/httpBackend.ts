import axios, { type InternalAxiosRequestConfig } from 'axios';

export interface ApiResponse<T = unknown> {
  status: number;
  message: string;
  data: T;
}

const baseURL = import.meta.env.DEV ? '' : import.meta.env.VITE_BACKEND_URL;

export const httpBackend = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 재시도 여부를 추적하기 위한 커스텀 config 타입
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 응답 데이터 변환 인터셉터 (먼저 등록 - 나중에 실행됨)
httpBackend.interceptors.response.use(
  (response) => {
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      console.error(
        '[Backend API Error]',
        error.response?.status,
        error.response?.data?.message || error.message,
      );
    } else {
      console.error('[Unexpected Error]', error);
    }
    return Promise.reject(error);
  },
);

// 401 에러 처리 및 토큰 재발급 인터셉터 (나중에 등록 - 먼저 실행됨)
httpBackend.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (axios.isAxiosError(error) && error.response) {
      const url = originalRequest.url || '';

      // 401 에러이고, 재시도하지 않은 요청이며, refresh 엔드포인트가 아닌 경우
      if (
        error.response.status === 401 &&
        !originalRequest._retry &&
        url !== '/api/users/refresh'
      ) {
        originalRequest._retry = true;

        try {
          console.log('[Token Refresh] Attempting to refresh token...');
          // 토큰 재발급 시도
          await httpBackend.post('/api/users/refresh');
          console.log('[Token Refresh] Token refreshed successfully');
          // 재발급 성공 시 원래 요청 재시도
          return httpBackend(originalRequest);
        } catch (refreshError) {
          console.error('[Token Refresh Failed]', refreshError);
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  },
);
