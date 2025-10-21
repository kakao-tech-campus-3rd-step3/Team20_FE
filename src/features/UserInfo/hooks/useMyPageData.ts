import { useQuery } from '@tanstack/react-query';
import { getMyPage } from '@/entities/user';

export const useMyPageData = () => {
  return useQuery({
    queryKey: ['mypage'],
    queryFn: getMyPage,
  });
};
