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

// Component Props Types
export interface UserProfileProps {
  email: string;
  nickname: string;
}

export interface ItineraryListProps {
  itineraries: Itinerary[];
  onItineraryClick: (itinerary: Itinerary) => void;
}

export interface ItineraryCardProps {
  itinerary: Itinerary;
  onClick: () => void;
}

export interface ItineraryDetailModalProps {
  itinerary: Itinerary | null;
  isOpen: boolean;
  onClose: () => void;
}