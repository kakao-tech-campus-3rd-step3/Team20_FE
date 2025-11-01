import { httpBackend } from '@/shared/api/httpBackend';
import { unstable_cache } from 'next/cache';
import type {
  ContentDetail,
  ContentLocation,
  CategoryContent,
  PopularContent,
  PopularResponse,
} from '../model/types';

// 인기 콘텐츠 조회 (기본 함수 - 클라이언트/서버 공용)
export const getPopularContents = async (): Promise<PopularContent[]> => {
  const data = await httpBackend.get<
    PopularResponse | PopularContent[],
    PopularResponse | PopularContent[]
  >('/contents/popular');
  if (Array.isArray(data)) return data;
  return data?.items ?? [];
};

// 서버 전용: 캐싱된 인기 콘텐츠 조회 (빌드 시 사용)
export const getPopularContentsCached = unstable_cache(
  getPopularContents,
  ['popular-contents'],
  {
    revalidate: 86400, // 24시간
    tags: ['popular-contents'],
  }
);

// 콘텐츠 상세 정보 조회
export const getContentDetail = async (contentId: string): Promise<ContentDetail> => {
  return httpBackend.get(`/contents/${contentId}`);
};

// 콘텐츠 관련 장소 조회
export const getContentLocations = async (contentId: string): Promise<ContentLocation[]> => {
  return httpBackend.get<ContentLocation[], ContentLocation[]>(
    `/contents/${contentId}/related-location`,
  );
};

// 카테고리별 콘텐츠 목록 조회 (기본 함수 - 클라이언트/서버 공용)
export const getCategoryContents = async (category: string): Promise<CategoryContent[]> => {
  const data = await httpBackend.get<
    CategoryContent[] | { items: CategoryContent[] },
    CategoryContent[] | { items: CategoryContent[] }
  >(`/contents/popular?category=${category}`);

  return Array.isArray(data) ? data : (data?.items ?? []);
};

// 작품명으로 콘텐츠 검색
export const searchContents = async (query: string): Promise<PopularContent[]> => {
  try {
    const response = await httpBackend.get<
      { items: PopularContent[]; pagination: unknown },
      { items: PopularContent[]; pagination: unknown }
    >(`/contents/search?title=${encodeURIComponent(query)}`);

    if (response && typeof response === 'object' && 'items' in response) {
      return response.items || [];
    }

    return Array.isArray(response) ? response : [];
  } catch {
    return [];
  }
};
