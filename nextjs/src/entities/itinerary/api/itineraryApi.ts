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
  const response = await http.post<CreateItineraryResponse>('/itineraries', data);
  return response.data;
};

export const getItineraries = async (): Promise<ItinerariesListResponse> => {
  const response = await http.get<ItinerariesListResponse>('/itineraries');
  return response.data;
};

export const getItineraryDetail = async (itineraryId: string): Promise<ItineraryDetailResponse> => {
  const response = await http.get<ItineraryDetailResponse>(`/itineraries/${itineraryId}`);
  return response.data;
};