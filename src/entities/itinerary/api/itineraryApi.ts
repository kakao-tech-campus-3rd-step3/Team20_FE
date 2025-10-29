import { http } from '@/shared/api';
import type {
  CreateItineraryRequest,
  CreateItineraryResponse,
  ItinerariesListResponse,
  ItineraryDetailResponse,
} from '../model/types';

export const createItinerary = async (
  data: CreateItineraryRequest,
): Promise<CreateItineraryResponse> => {
  return (await http.post('/itineraries', data)) as CreateItineraryResponse;
};

export const getItineraries = async (): Promise<ItinerariesListResponse> => {
  return (await http.get('/itineraries')) as ItinerariesListResponse;
};

export const getItineraryDetail = async (itineraryId: string): Promise<ItineraryDetailResponse> => {
  return (await http.get(`/itineraries/${itineraryId}`)) as ItineraryDetailResponse;
};
