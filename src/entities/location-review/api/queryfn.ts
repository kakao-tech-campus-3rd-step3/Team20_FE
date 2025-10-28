import { useMutation, useQuery, useQueryClient, type UseQueryResult } from '@tanstack/react-query';
import { createLocationReview, getLocationReviews } from './locationReviewApi';
import { locationReviewQueryKeys } from './queryKeys';
import type {
  CreateLocationReviewRequest,
  CreateLocationReviewResponse,
  LocationReviewsResponse,
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
