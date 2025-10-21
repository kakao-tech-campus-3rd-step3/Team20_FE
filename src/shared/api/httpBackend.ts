import axios from 'axios';
import { tokenStorage } from './tokenStorage';

export interface ApiResponse<T = unknown> {
  status: number;
  message: string;
  data: T;
}

// FE api와 BE api연동간 기존 코드 호환성 문제때문에 별도의 axios 객체를 만들었습니다.
// 일단 하드 코딩 해둘게요. 
//추석연휴간 GET 함수를 구현할때는 토큰 사용하실 일 없으실거예요.

const baseURL = 'https://k-spot.kro.kr';

export const httpBackend = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpBackend.interceptors.response.use(
  (response) => {
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

const PUBLIC_API_PATHS = ['/api/users/login', '/api/users', '/contents', '/locations'];

httpBackend.interceptors.request.use(
  (config) => {
    const url = config.url || '';

    const isPublicApi = PUBLIC_API_PATHS.some((path) => url.startsWith(path));
    if (isPublicApi) {
      return config;
    }

    const token = tokenStorage.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
