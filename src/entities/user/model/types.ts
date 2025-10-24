export interface User {
  userId: number;
  nickname: string;
}

export interface Location {
  locationId: number;
  name: string;
  address: string;
  visitOrder: number;
}

export interface Itinerary {
  itineraryId: number;
  user: User;
  title: string;
  description: string;
  createdAt: string;
  locations: Location[];
}

export interface MyPageData {
  email: string;
  nickname: string;
  list: Itinerary[];
}
