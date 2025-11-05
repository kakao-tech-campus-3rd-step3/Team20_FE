// 여행 일정 API 호출 함수

import { ItineraryRequest, ItineraryResponse } from '../model/types';

const API_ENDPOINT = 'https://generate-itinerary-fdikd3j6pa-du.a.run.app';

export class ItineraryAPI {
  static async generateItinerary(request: ItineraryRequest): Promise<ItineraryResponse> {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ItineraryResponse = await response.json();
      return data;
    } catch (error) {
      console.error('API 호출 실패:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
      };
    }
  }
}

// 교통 허브 데이터 (실제로는 API에서 가져올 수 있음)
export const TRANSPORT_HUBS = {
  airports: [
    { id: 'ICN', name: '인천국제공항', region: '인천' },
    { id: 'GMP', name: '김포국제공항', region: '서울' },
    { id: 'PUS', name: '김해국제공항', region: '부산' },
    { id: 'CJU', name: '제주국제공항', region: '제주' },
  ],
  stations: [
    { id: 'SEOUL', name: '서울역', region: '서울' },
    { id: 'BUSAN', name: '부산역', region: '부산' },
    { id: 'DAEGU', name: '대구역', region: '대구' },
    { id: 'GWANGJU', name: '광주송정역', region: '광주' },
  ],
};

export const DURATION_OPTIONS = [
  { value: '당일', label: '당일치기' },
  { value: '1박2일', label: '1박 2일' },
  { value: '2박3일', label: '2박 3일' },
] as const;

export const THEME_OPTIONS = [
  { value: 'all', label: '전체', description: '모든 장르의 콘텐츠' },
  { value: 'drama', label: '드라마', description: 'K-드라마 촬영지' },
  { value: 'movie', label: '영화', description: '영화 촬영지' },
  { value: 'pop', label: 'K-POP', description: 'K-POP 뮤직비디오 촬영지' },
] as const;