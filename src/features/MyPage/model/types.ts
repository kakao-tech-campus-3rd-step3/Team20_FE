export interface Location {
  locationId: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  locationImage: string;
  relatedContents: RelatedContent[];
}

export interface RelatedContent {
  contentId: number;
  title: string;
  category: string;
}

export interface SavedLocation {
  locationId: number;
  name: string;
  image: string;
  address: string;
  description: string;
}

export interface SavedRoute {
  routeId: number;
  name: string;
  locations: string[];
  createdAt: string;
  description: string;
}

export interface TravelCardData {
  title: string;
  image: string;
  description: string;
  additionalText: string;
}

export interface ApiResponse<T = unknown> {
  status: number;
  message: string;
  data: T;
}
