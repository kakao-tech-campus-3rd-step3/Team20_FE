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
