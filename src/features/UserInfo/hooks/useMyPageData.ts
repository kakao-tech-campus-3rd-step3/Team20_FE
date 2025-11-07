import { useSuspenseQuery } from '@tanstack/react-query';
import { getMyPage } from '@/entities/user';

export const useMyPageData = () => {
  const query = useSuspenseQuery({
    queryKey: ['mypage'],
    queryFn: getMyPage,
  });

  return {
    ...query,
    refetch: query.refetch,
  };
};
