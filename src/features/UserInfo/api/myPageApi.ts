import { http } from '@/shared/api/http';
import type { MyPageData } from '../model/types';

export const myPageApi = {
  getMyPage: async (): Promise<MyPageData> => {
    return http.get('/api/users/mypage');
  },
};
