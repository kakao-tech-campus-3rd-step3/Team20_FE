// AI 동선 백엔드 API 관련 타입 정의

import { ItineraryResponse } from './types';

// AI 동선 저장 요청
export interface SaveAiItineraryRequest {
  data: NonNullable<ItineraryResponse['data']>;
  startPoint: string;
  endPoint: string;
  duration: string;
  theme: string;
}

// AI 동선 저장 응답
export interface SaveAiItineraryResponse {
  status: number;
  message: string;
  data: {
    itineraryId: number;
  };
}

// AI 동선 상세 조회 응답
export interface AiItineraryDetail {
  itineraryId: number;
  startPoint: string;
  endPoint: string;
  duration: string;
  theme: string;
  data: NonNullable<ItineraryResponse['data']>;
  createdAt: string;
  updatedAt: string;
}

export interface AiItineraryDetailResponse {
  status: number;
  message: string;
  data: AiItineraryDetail;
}

// 사용자 AI 동선 목록 조회 응답
export interface AiItinerarySummary {
  itineraryId: number;
  startPoint: string;
  endPoint: string;
  duration: string;
  theme: string;
  createdAt: string;
}

export interface UserAiItinerariesResponse {
  status: number;
  message: string;
  data: AiItinerarySummary[];
}

// AI 동선 삭제 응답
export interface DeleteAiItineraryResponse {
  status: number;
  message: string;
  data: {};
}