import axios from 'axios';
import { tokenStorage } from './tokenStorage';

export interface ApiResponse<T = unknown> {
    status: number;
    message: string;
    data: T;
}

// FE api와 BE api연동간 기존 코드 호환성 문제때문에 별도의 axios 객체를 만들었습니다.
// 개발 환경에서는 Vite 프록시를 사용하고, 프로덕션에서는 직접 백엔드 URL 사용
const baseURL = import.meta.env.DEV ? '' : 'https://k-spot.kro.kr';

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

const PUBLIC_API_PATHS = ['/api/users/login', '/contents', '/locations'];
const PUBLIC_API_EXACT_PATHS = ['/api/users']; // 정확히 일치해야 하는 경로

httpBackend.interceptors.request.use(
    (config) => {
        const url = config.url || '';

        const isPublicApi =
            PUBLIC_API_PATHS.some((path) => url.startsWith(path)) ||
            PUBLIC_API_EXACT_PATHS.some((path) => url === path);
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