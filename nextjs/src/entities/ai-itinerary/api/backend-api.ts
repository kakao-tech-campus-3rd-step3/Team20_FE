import { httpBackend } from '@/shared/api/httpBackend';
import type {
  SaveAiItineraryRequest,
  AiItineraryDetail,
  AiItinerarySummary,
} from '../model/backend-types';

// AI 동선 저장
export const saveAiItinerary = async (
  data: SaveAiItineraryRequest,
): Promise<{ itineraryId: number }> => {
  return (await httpBackend.post('/ai-itineraries', data, {
    withCredentials: true,
  })) as { itineraryId: number };
};

// 특정 AI 동선 조회
export const getAiItinerary = async (
  itineraryId: number,
): Promise<AiItineraryDetail> => {
  return (await httpBackend.get(`/ai-itineraries/${itineraryId}`, {
    withCredentials: true,
  })) as AiItineraryDetail;
};

// 사용자의 AI 동선들 조회
export const getUserAiItineraries = async (): Promise<AiItinerarySummary[]> => {
  return (await httpBackend.get('/ai-itineraries/user', {
    withCredentials: true,
  })) as AiItinerarySummary[];
};

// AI 동선 삭제
export const deleteAiItinerary = async (
  itineraryId: number,
): Promise<Record<string, never>> => {
  return (await httpBackend.delete(`/ai-itineraries/${itineraryId}`, {
    withCredentials: true,
  })) as Record<string, never>;
};