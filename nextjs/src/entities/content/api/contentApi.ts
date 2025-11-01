import { httpBackend } from '@/shared/api/httpBackend';
import type {
  ContentDetail,
  ContentLocation,
  CategoryContent,
  PopularContent,
  PopularResponse,
} from '../model/types';

// 인기 콘텐츠 Top 10 조회
// src/entities/content/api/contentApi.ts
export const getPopularContents = async (): Promise<PopularContent[]> => {
  const data = await httpBackend.get<
    PopularResponse | PopularContent[],
    PopularResponse | PopularContent[]
  >('/contents/popular');
  if (Array.isArray(data)) return data;
  return data?.items ?? [];
};

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

// 카테고리별 콘텐츠 목록 조회
export const getCategoryContents = async (category: string): Promise<CategoryContent[]> => {
  // ① 서버 raw data 타입 | { items: CategoryContent[] } 둘 다 수용
  // ② 인터셉터 이후 최종 반환 타입도 동일하게 지정(두 번째 제네릭)
  const data = await httpBackend.get<
    CategoryContent[] | { items: CategoryContent[] },
    CategoryContent[] | { items: CategoryContent[] }
  >(`/contents/popular?category=${category}`);

  // 어떤 형태로 와도 배열만 리턴
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
