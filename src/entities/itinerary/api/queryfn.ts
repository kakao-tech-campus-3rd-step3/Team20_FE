import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createItinerary,
  getItineraries,
  getItineraryDetail,
  updateItinerary,
} from './itineraryApi';
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
    enabled: !!itineraryId && itineraryId.length > 0,
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
      // 마이페이지 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['mypage'] });
    },
  });
};

// 여행 계획 수정
export const useUpdateItinerary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itineraryId, data }: { itineraryId: string; data: CreateItineraryRequest }) =>
      updateItinerary(itineraryId, data),
    onSuccess: (_, variables) => {
      // 여행 계획 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: itineraryKeys.lists() });
      // 해당 여행 계획 상세 캐시 무효화
      queryClient.invalidateQueries({ queryKey: itineraryKeys.detail(variables.itineraryId) });
      // 마이페이지 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['mypage'] });
    },
  });
};
