import { http } from '@/shared/api';
import type { PopularContent, ContentDetail, ContentLocation } from '../model/types';

// 인기 콘텐츠 목록 조회
export const getPopularContents = async (): Promise<PopularContent[]> => {
  return http.get('/contents/popular');
};

// 콘텐츠 상세 정보 조회
export const getContentDetail = async (contentId: string): Promise<ContentDetail> => {
  return http.get(`/contents/${contentId}`);
};

// 콘텐츠 촬영지 목록 조회
export const getContentLocations = async (contentId: string): Promise<ContentLocation[]> => {
  return http.get(`/contents/${contentId}/locations`);
};
