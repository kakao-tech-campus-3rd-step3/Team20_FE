import { httpBackend } from '@/shared/api/httpBackend';
import type {
  CreateItineraryRequest,
  CreateItineraryResponse,
  ItinerariesListResponse,
  ItineraryDetailResponse,
} from '../model/types';

export const createItinerary = async (
  data: CreateItineraryRequest,
): Promise<CreateItineraryResponse> => {
  return (await httpBackend.post('/itineraries', data)) as CreateItineraryResponse;
};

export const getItineraries = async (): Promise<ItinerariesListResponse> => {
  return (await httpBackend.get('/itineraries')) as ItinerariesListResponse;
};

export const getItineraryDetail = async (itineraryId: string): Promise<ItineraryDetailResponse> => {
  return (await httpBackend.get(`/itineraries/${itineraryId}`)) as ItineraryDetailResponse;
};
