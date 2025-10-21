//TODO 테스트용 api임으로 추후 entities로 이동예정
import { httpBackend } from '@/shared/api/httpBackend';
import { tokenStorage } from '@/shared/api/tokenStorage';
import type { MyPageData } from '../model/types';

// 테스트용 마스터 토큰
const TEST_TOKEN =
  'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIxIiwidHlwIjoibWFzdGVyIn0.3PZMoQI6OU7L-WBSB7S-tx2ZYJ_Jt37wN6PY3q64uOLbrO18Y_qHPir1dXkWvjE0';

export const myPageApi = {
  getMyPage: async (): Promise<MyPageData> => {
    // 테스트 토큰 설정
    tokenStorage.setToken(TEST_TOKEN);
    return httpBackend.get('/api/users/mypage');
  },
};
