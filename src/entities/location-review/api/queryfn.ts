import { useMutation, useQuery, useQueryClient, type UseQueryResult } from '@tanstack/react-query';
import {
  createLocationReview,
  deleteLocationReview,
  getLocationReviews,
  updateLocationReview,
} from './locationReviewApi';
import { locationReviewQueryKeys } from './queryKeys';
import type {
  CreateLocationReviewRequest,
  CreateLocationReviewResponse,
  LocationReviewsResponse,
  UpdateLocationReviewRequest,
  UpdateLocationReviewResponse,
} from '../model/types';

export const useLocationReviews = (
  locationId: string,
): UseQueryResult<LocationReviewsResponse, Error> => {
  return useQuery<LocationReviewsResponse, Error>({
    queryKey: locationReviewQueryKeys.byLocation(locationId),
    queryFn: () => getLocationReviews(locationId),
    enabled: !!locationId,
  });
};

export const useCreateLocationReview = (locationId: string) => {
  const queryClient = useQueryClient();
  return useMutation<CreateLocationReviewResponse, Error, CreateLocationReviewRequest>({
    mutationFn: (payload) =>
      createLocationReview(locationId, {
        title: payload.title,
        rating: payload.rating,
        detail: payload.detail,
      }),
    onSuccess: () => {
      // 작성 후 목록을 신선하게 갱신
      queryClient.invalidateQueries({ queryKey: locationReviewQueryKeys.byLocation(locationId) });
    },
  });
};

export const useDeleteLocationReview = (locationId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (locationReviewId: number | string) => deleteLocationReview(locationReviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: locationReviewQueryKeys.byLocation(locationId) });
    },
  });
};

export const useUpdateLocationReview = (locationId: string) => {
  const queryClient = useQueryClient();
  return useMutation<
    UpdateLocationReviewResponse,
    Error,
    { locationReviewId: number | string; data: UpdateLocationReviewRequest }
  >({
    mutationFn: ({ locationReviewId, data }) => updateLocationReview(locationReviewId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: locationReviewQueryKeys.byLocation(locationId) });
    },
  });
};
