import { httpBackend } from '@/shared/api/httpBackend';
import type {
  LocationReviewsResponse,
  CreateLocationReviewRequest,
  CreateLocationReviewResponse,
} from '../model/types';

export const getLocationReviews = async (locationId: string): Promise<LocationReviewsResponse> => {
  try {
    const response = await httpBackend.get(`/api/location_review/location/${locationId}`);
    if (!response) {
      return {
        locationReviews: [],
        pagination: { currentPage: 0, itemPerPage: 10, totalItems: 0, totalPages: 0 },
      };
    }
    return response as unknown as LocationReviewsResponse;
  } catch (error) {
    console.error('Location Reviews API error:', error);
    return {
      locationReviews: [],
      pagination: { currentPage: 0, itemPerPage: 10, totalItems: 0, totalPages: 0 },
    };
  }
};

export const createLocationReview = async (
  locationId: string,
  payload: CreateLocationReviewRequest,
): Promise<CreateLocationReviewResponse> => {
  try {
    const body = {
      locationId: Number(locationId),
      title: payload.title,
      rating: payload.rating,
      detail: payload.detail,
    };
    const response = await httpBackend.post(`/api/location_review`, body);
    return response as unknown as CreateLocationReviewResponse;
  } catch (error) {
    const err = error as unknown as {
      response?: { data?: { message?: string } };
      message?: string;
    };
    const msg = err?.response?.data?.message || err?.message || 'Unknown error';
    console.error('Create Location Review API error:', msg);
    throw new Error(msg);
  }
};
