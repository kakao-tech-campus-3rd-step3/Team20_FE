import { http } from '@/shared/api';
import type {
  ContentDetail,
  ContentLocation,
  PopularContent,
  CategoryContent,
} from '../model/types';

// 인기 콘텐츠 Top 10 조회
export const getPopularContents = async (): Promise<PopularContent[]> => {
  return http.get('/contents');
};

// 콘텐츠 상세 정보 조회
export const getContentDetail = async (contentId: string): Promise<ContentDetail> => {
  return http.get(`/contents/${contentId}`);
};

// 콘텐츠 관련 장소 조회
export const getContentLocations = async (contentId: string): Promise<ContentLocation[]> => {
  return http.get(`/contents/${contentId}/related-locations`);
};

// 카테고리별 콘텐츠 목록 조회
export const getCategoryContents = async (category: string): Promise<CategoryContent[]> => {
  return http.get(`/contents?category=${category}`);
};

// 작품명으로 콘텐츠 검색 (임시: 모든 콘텐츠를 가져와서 클라이언트에서 필터링)
export const searchContents = async (query: string): Promise<ContentDetail[]> => {
  try {
    // 기존 함수를 재사용하여 모든 인기 콘텐츠를 가져옴
    const allContents = await getPopularContents();

    // 클라이언트에서 제목으로 필터링 (공백 무시)
    const filteredContents = (allContents as unknown as ContentDetail[]).filter(
      (content: ContentDetail) => {
        const searchTerm = query.toLowerCase().replace(/\s+/g, '');
        const title = content.title?.toLowerCase().replace(/\s+/g, '') || '';
        const description = content.description?.toLowerCase().replace(/\s+/g, '') || '';

        return title.includes(searchTerm) || description.includes(searchTerm);
      },
    );

    return filteredContents;
  } catch {
    return [];
  }
};
