import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createItinerary, getItineraries, getItineraryDetail } from './itineraryApi';
import { itineraryKeys } from './queryKeys';
import type { CreateItineraryRequest } from '../model/types';

// 여행 계획 목록 조회
export const useItineraries = () => {
  return useQuery({
    queryKey: itineraryKeys.lists(),
    queryFn: getItineraries,
  });
};

// 여행 계획 상세 조회
export const useItineraryDetail = (itineraryId: string) => {
  return useQuery({
    queryKey: itineraryKeys.detail(itineraryId),
    queryFn: () => getItineraryDetail(itineraryId),
    enabled: !!itineraryId,
  });
};

// 여행 계획 생성
export const useCreateItinerary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateItineraryRequest) => createItinerary(data),
    onSuccess: () => {
      // 여행 계획 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: itineraryKeys.lists() });
    },
  });
};
