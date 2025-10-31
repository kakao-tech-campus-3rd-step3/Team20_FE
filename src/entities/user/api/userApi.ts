import { httpBackend } from '@/shared/api/httpBackend';
import type { MyPageData } from '@/entities/user/model/types';

export const getMyPage = async (): Promise<MyPageData> => {
  return httpBackend.get('/users/mypage');
};
