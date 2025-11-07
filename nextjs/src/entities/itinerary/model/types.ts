export interface CreateItineraryRequest {
  title: string;
  description: string;
  locations: {
    locationId: number;
    visitOrder: number;
  }[];
}

export interface CreateItineraryResponse {
  status: number;
  message: string;
  data: {
    itineraryId: string;
  };
}

export interface ItinerarySummary {
  createdAt: string;
  itineraryId: string;
  title: string;
}

export interface ItinerariesListResponse {
  status: number;
  message: string;
  data: {
    count: number;
    itineraries: ItinerarySummary[];
  };
}

export interface ItineraryLocation {
  locationId: number;
  name: string;
  address: string;
  visitOrder: number;
}

export interface ItineraryDetail {
  locations: ItineraryLocation[];
  createdAt: string;
  description: string;
  userId: string;
  itineraryId: string;
  title: string;
  user: {
    userId: string;
    nickname: string;
  };
}

export interface ItineraryDetailResponse {
  status: number;
  message: string;
  data: ItineraryDetail;
}