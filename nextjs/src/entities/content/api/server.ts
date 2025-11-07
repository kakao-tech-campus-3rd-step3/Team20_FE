// 서버 컴포넌트용 데이터 페칭 함수들
import { getContentDetail, getPopularContents, getCategoryContents } from './contentApi';
import type { PopularContent, ContentDetail, CategoryContent } from '../model/types';

// 서버에서 인기 콘텐츠 목록 조회
export async function getPopularContentsServer(): Promise<PopularContent[]> {
  return await getPopularContents();
}

// 서버에서 콘텐츠 상세 정보 조회
export async function getContentDetailServer(contentId: string): Promise<ContentDetail> {
  return await getContentDetail(contentId);
}

// 서버에서 카테고리별 콘텐츠 조회
export async function getCategoryContentsServer(category: string): Promise<CategoryContent[]> {
  return await getCategoryContents(category);
}

// 서버에서 여러 콘텐츠 상세 정보 일괄 조회
export async function getRelatedContentDetailsServer(ids: (string | number)[]): Promise<ContentDetail[]> {
  const results = await Promise.all(ids.map((id) => getContentDetail(String(id))));
  return results;
}
