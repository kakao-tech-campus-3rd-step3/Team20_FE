import axios from 'axios';

// API 응답 타입 정의
export interface ApiResponse<T = unknown> {
  status: number;
  message: string;
  data: T;
}

// 기본 Axios 인스턴스 생성
export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 응답 인터셉터 - API 응답에서 data 부분만 추출
http.interceptors.response.use(
  (response) => {
    // 성공 응답에서 data 추출
    return response.data.data;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      console.error(
        '[Axios Error]',
        error.response?.status,
        error.response?.data?.message || error.message,
      );
    } else {
      console.error('[Unexpected Error]', error);
    }
    return Promise.reject(error);
  },
);
