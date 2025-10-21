//TODO 테스트용 api임으로 추후 entities로 이동예정
import { httpBackend } from '@/shared/api/httpBackend';
import type { MyPageData } from '../model/types';

export const myPageApi = {
  getMyPage: async (): Promise<MyPageData> => {
    return httpBackend.get('/api/users/mypage');
  },
};
