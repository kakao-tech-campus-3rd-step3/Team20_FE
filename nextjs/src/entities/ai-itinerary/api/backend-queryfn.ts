import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  saveAiItinerary,
  getAiItinerary,
  getUserAiItineraries,
  deleteAiItinerary,
} from './backend-api';
import type { SaveAiItineraryRequest } from '../model/backend-types';

// Query Keys
export const aiItineraryKeys = {
  all: ['ai-itineraries'] as const,
  lists: () => [...aiItineraryKeys.all, 'list'] as const,
  list: (filters: string) => [...aiItineraryKeys.lists(), { filters }] as const,
  details: () => [...aiItineraryKeys.all, 'detail'] as const,
  detail: (id: number) => [...aiItineraryKeys.details(), id] as const,
};

// 사용자의 AI 동선 목록 조회
export const useUserAiItineraries = () => {
  return useQuery({
    queryKey: aiItineraryKeys.lists(),
    queryFn: getUserAiItineraries,
  });
};

// 특정 AI 동선 상세 조회
export const useAiItinerary = (itineraryId: number) => {
  return useQuery({
    queryKey: aiItineraryKeys.detail(itineraryId),
    queryFn: () => getAiItinerary(itineraryId),
    enabled: !!itineraryId,
  });
};

// AI 동선 저장
export const useSaveAiItinerary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SaveAiItineraryRequest) => saveAiItinerary(data),
    onSuccess: () => {
      // AI 동선 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: aiItineraryKeys.lists() });
    },
  });
};

// AI 동선 삭제
export const useDeleteAiItinerary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itineraryId: number) => deleteAiItinerary(itineraryId),
    onSuccess: (_, itineraryId) => {
      // 해당 AI 동선 상세 캐시 제거
      queryClient.removeQueries({ queryKey: aiItineraryKeys.detail(itineraryId) });
      // AI 동선 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: aiItineraryKeys.lists() });
    },
  });
};