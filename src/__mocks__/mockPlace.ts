import type { Place } from '@/features/Sidebar/model/types';

export const MOCK_PLACES: Place[] = Array.from({ length: 8 }).map((_, idx) => ({
  id: String(idx + 1),
  name: idx === 0 ? '대한봉진학교' : idx === 1 ? '무인도 세트장' : `촬영지 ${idx + 1}`,
  address: idx === 0 ? '경기도 안산시 상록구' : idx === 1 ? '인천광역시 중구' : '경기/인천 일대',
  tags: idx === 0 ? ['메인 촬영지', '학교'] : ['세트', '바다'],
  rating: 4.8 - idx * 0.1,
}));
