import { httpBackend } from '@/shared/api/httpBackend';
import type {
  LocationReviewsResponse,
  CreateLocationReviewRequest,
  CreateLocationReviewResponse,
  DeleteLocationReviewResponse,
  UpdateLocationReviewRequest,
  UpdateLocationReviewResponse,
} from '../model/types';

export const getLocationReviews = async (locationId: string): Promise<LocationReviewsResponse> => {
  try {
    const response = await httpBackend.get(`/location_review/location/${locationId}`);
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
    const response = await httpBackend.post(`/location_review`, body);
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

export const deleteLocationReview = async (
  locationReviewId: string | number,
): Promise<DeleteLocationReviewResponse> => {
  try {
    const response = await httpBackend.delete(`/location_review/${locationReviewId}`);
    return response as unknown as DeleteLocationReviewResponse;
  } catch (error) {
    const err = error as unknown as {
      response?: { data?: { message?: string } };
      message?: string;
    };
    const msg = err?.response?.data?.message || err?.message || 'Unknown error';
    console.error('Delete Location Review API error:', msg);
    throw new Error(msg);
  }
};

export const updateLocationReview = async (
  locationReviewId: string | number,
  payload: UpdateLocationReviewRequest,
): Promise<UpdateLocationReviewResponse> => {
  try {
    const body = {
      locationId: Number(payload.locationId),
      title: payload.title,
      detail: payload.detail ?? '',
      rating: payload.rating,
    };
    const response = await httpBackend.put(`/location_review/${locationReviewId}`, body);
    return response as unknown as UpdateLocationReviewResponse;
  } catch (error) {
    const err = error as unknown as {
      response?: { data?: { message?: string } };
      message?: string;
    };
    const msg = err?.response?.data?.message || err?.message || 'Unknown error';
    console.error('Update Location Review API error:', msg);
    throw new Error(msg);
  }
};
