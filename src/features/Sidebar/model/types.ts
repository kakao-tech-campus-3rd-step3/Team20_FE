import type { LocationDetail } from '@/entities/location/model/types';

export type Place = LocationDetail;

export type PlaceCardProps = {
  imageUrl?: string[];
  name?: string;
  address?: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  relatedContents?: LocationDetail['relatedContents'];
  onClick?: () => void;
  className?: string;
  badgeNumber?: number;
  isInRoute?: boolean;
};

export type PlaceListProps = {
  places?: Place[];
  className?: string;
  onPlaceClick?: (place: Place) => void;
  onAddToRoute?: (place: Place) => void;
  routePlaces?: Place[];
  selectedPlace?: Place | null;
};

export type SidebarProps = PlaceListProps & {
  contentId?: string;
  onSearchPlacesChange?: (places: Place[]) => void;
  searchPlaces?: Place[];
};

export type SidebarSearchProps = {
  className?: string;
  onPlacesChange?: (places: Place[]) => void;
  onSearchStateChange?: (isSearching: boolean, query: string) => void;
};

export type PopularContentsSuggestProps = {
  onPlacesChange?: (places: Place[]) => void;
  onSearchStateChange?: (isSearching: boolean, query: string) => void;
};

export type ThumbnailProps = Pick<PlaceCardProps, 'imageUrl' | 'name' | 'badgeNumber'>;

export type UseContentSearchOptions = {
  debounceMs?: number;
  onPlacesChange?: (places: Place[]) => void;
};
