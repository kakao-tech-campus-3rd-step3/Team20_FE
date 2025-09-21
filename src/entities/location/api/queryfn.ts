import { useSuspenseQuery } from '@tanstack/react-query';
import { getContentDetail } from '@/entities/content/api/contentApi';
// 콘텐츠 상세 정보 조회
export const useContentDetail = (contentId: number) => {
  return useSuspenseQuery({
    queryKey: ['content', contentId],
    queryFn: () => getContentDetail(contentId.toString()),
  });
};
