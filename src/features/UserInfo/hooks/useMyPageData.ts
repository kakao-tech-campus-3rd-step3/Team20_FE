import { useQuery } from '@tanstack/react-query';
import { myPageApi } from '../api/myPageApi';

export const useMyPageData = () => {
  return useQuery({
    queryKey: ['mypage'],
    queryFn: myPageApi.getMyPage,
  });
};
