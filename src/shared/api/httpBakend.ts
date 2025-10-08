import axios from 'axios';

// API 응답 타입 정의
export interface ApiResponse<T = unknown> {
  status: number;
  message: string;
  data: T;
}

// 백엔드 전용 Axios 인스턴스 생성 (Auth 관련)
export const httpBackend = axios.create({
  baseURL: 'https://k-spot.kro.kr/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 응답 인터셉터 - API 응답에서 data 부분만 추출
httpBackend.interceptors.response.use(
  (response) => {
    // 성공 응답에서 data 추출
    return response.data.data;
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

// 요청 인터셉터 - JWT 토큰 자동 추가
httpBackend.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
