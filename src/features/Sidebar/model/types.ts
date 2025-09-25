import type { LocationDetail } from '@/entities/location/model/types';

export type Place = LocationDetail;

export type PlaceCardProps = {
  locationImage?: string;
  name?: string;
  address?: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  relatedContents?: LocationDetail['relatedContents'];
  onClick?: () => void;
  className?: string;
  badgeNumber?: number;
};

export type PlaceListProps = {
  places?: Place[];
  className?: string;
  onPlaceClick?: (place: Place) => void;
};

export type SidebarProps = {
  className?: string;
  contentId?: string;
  onSearchPlacesChange?: (places: Place[]) => void;
  onPlaceClick?: (place: Place) => void;
};

export type SidebarSearchProps = {
  className?: string;
  onPlacesChange?: (places: Place[]) => void;
  onSearchStateChange?: (isSearching: boolean, query: string) => void;
};

export type ThumbnailProps = Pick<PlaceCardProps, 'locationImage' | 'name' | 'badgeNumber'>;

export type KakaoPlace = {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
  place_url: string;
  distance: string;
};

export type UseKakaoPlaceSearchOptions = {
  debounceMs?: number;
  enabled?: boolean;
  onPlacesChange?: (places: Place[]) => void;
};

export type KakaoMapsServices = {
  Places: {
    new (): {
      keywordSearch: (
        query: string,
        callback: (data: KakaoPlace[], status: unknown) => void,
      ) => void;
    };
  };
  Status: {
    OK: unknown;
    ZERO_RESULT: unknown;
  };
};

export type KakaoMaps = {
  services: KakaoMapsServices;
};

export type WindowWithKakao = {
  kakao?: {
    maps: KakaoMaps;
  };
};

export type SidebarSearchResultsProps = {
  searchQuery: string;
  places: Place[];
  onPlaceClick?: (place: Place) => void;
};
