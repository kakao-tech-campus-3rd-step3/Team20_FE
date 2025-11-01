'use client';

import { useQuery } from '@tanstack/react-query';
import { getMyPage } from '@/entities/user';

export const useMyPageData = () => {
  const query = useQuery({
    queryKey: ['mypage'],
    queryFn: getMyPage,
  });

  return {
    ...query,
    refetch: query.refetch,
  };
};