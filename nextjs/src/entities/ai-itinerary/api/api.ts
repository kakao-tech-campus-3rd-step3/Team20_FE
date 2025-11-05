// 여행 일정 API 호출 함수

import { ItineraryRequest, ItineraryResponse } from '../model/types';

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export class ItineraryAPI {
  static async generateItinerary(request: ItineraryRequest): Promise<ItineraryResponse> {
    if (!API_ENDPOINT) {
      return {
        success: false,
        error: 'API 엔드포인트가 설정되지 않았습니다. 환경 변수를 확인해주세요.',
      };
    }

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        if (response.status === 400) {
          return {
            success: false,
            error: '연관된 장소를 찾을 수 없어요! 다른 일정으로 검색해주세요!',
          };
        }
        if (response.status === 500) {
          return {
            success: false,
            error: '서버에 일시적인 문제가 발생했어요. 잠시 후 다시 시도해주세요!',
          };
        }

        return {
          success: false,
          error: '서비스에 접속할 수 없어요. 네트워크 연결을 확인해주세요!',
        };
      }
      const data: ItineraryResponse = await response.json();
      return data;
    } catch (error) {
      console.error('API 호출 실패:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return {
          success: false,
          error: '인터넷 연결을 확인해주세요. 네트워크에 문제가 있는 것 같아요!',
        };
      }
      return {
        success: false,
        error: '예상치 못한 문제가 발생했어요. 다시 시도해주세요!',
      };
    }
  }
}

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