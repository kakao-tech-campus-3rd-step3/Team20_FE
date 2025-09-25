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
