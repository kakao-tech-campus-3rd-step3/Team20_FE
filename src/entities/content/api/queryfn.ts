import { useSuspenseQuery, type UseSuspenseQueryResult } from '@tanstack/react-query';
import { getContentDetail, getPopularContents } from './contentApi';
import type { PopularContent, ContentDetail, CategoryContent } from '../model/types';
import { contentQueryKeys } from './queryKeys';
import { getCategoryContents } from './contentApi';
// 인기 콘텐츠 목록 조회
export const usePopularContents = () => {
  return useSuspenseQuery<PopularContent[]>({
    queryKey: contentQueryKeys.popular(),
    queryFn: getPopularContents,
  });
};

// 콘텐츠 상세 정보 조회
export const useContentDetail = (
  contentId: string,
): UseSuspenseQueryResult<ContentDetail, Error> => {
  return useSuspenseQuery<ContentDetail, Error>({
    queryKey: contentQueryKeys.detail(contentId),
    queryFn: () => getContentDetail(contentId),
  });
};

export const useCategoryContents = (category: string) => {
  return useSuspenseQuery<CategoryContent[], Error>({
    queryKey: contentQueryKeys.category(category),
    queryFn: () => getCategoryContents(category),
  });
};
