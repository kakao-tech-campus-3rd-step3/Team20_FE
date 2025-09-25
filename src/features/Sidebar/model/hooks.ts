import { useState, useCallback, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getContentDetail, getContentLocations } from '@/entities/content/api/contentApi';
import { getLocationDetail } from '@/entities/location/api/locationApi';
import type {
  Place,
  KakaoPlace,
  UseKakaoPlaceSearchOptions,
  WindowWithKakao,
} from '../model/types';
import type { ContentLocation } from '@/entities/content/model/types';
import type { LocationDetail } from '@/entities/location/model/types';
import { contentQueryKeys } from '@/entities/content/api/queryKeys';

export function useSidebarData(contentId?: string) {
  const { data: contentDetail } = useQuery({
    queryKey: contentQueryKeys.detail(contentId || ''),
    queryFn: () => getContentDetail(contentId || ''),
    enabled: !!contentId,
  });

  const {
    data: places = [],
    isLoading,
    error,
  } = useQuery<Place[]>({
    queryKey: contentQueryKeys.locations(contentId || ''),
    queryFn: async () => {
      const locations = await getContentLocations(contentId || '');

      const hasAddress = (
        location: ContentLocation | LocationDetail,
      ): location is LocationDetail => {
        return 'address' in location;
      };

      const detailedLocations = await Promise.all(
        locations.map(async (location: ContentLocation | LocationDetail) => {
          try {
            if (!hasAddress(location)) {
              // ContentLocation 타입의 경우 location_id 사용
              const locationId = (location as ContentLocation).location_id;
              return await getLocationDetail(locationId.toString());
            }
            return location;
          } catch {
            return location;
          }
        }),
      );
      return detailedLocations as Place[];
    },
    enabled: !!contentId,
  });

  return {
    contentDetail,
    places,
    isLoading,
    error,
  };
}

const getKakaoMaps = (): WindowWithKakao['kakao'] | null => {
  if (typeof window === 'undefined') return null;
  return (window as unknown as WindowWithKakao).kakao || null;
};

const isKakaoMapsLoaded = (): boolean => {
  const kakao = getKakaoMaps();
  return !!kakao?.maps?.services;
};

export function useKakaoPlaceSearch(options: UseKakaoPlaceSearchOptions = {}) {
  const { debounceMs = 300, enabled = true, onPlacesChange } = options;
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const placesServiceRef = useRef<unknown>(null);

  useEffect(() => {
    if (isKakaoMapsLoaded() && enabled) {
      const kakao = getKakaoMaps();
      if (kakao?.maps?.services?.Places) {
        placesServiceRef.current = new kakao.maps.services.Places();
      }
    }
  }, [enabled]);

  const convertKakaoPlaceToPlace = useCallback((kakaoPlace: KakaoPlace, index: number): Place => {
    return {
      locationId: parseInt(kakaoPlace.id) || index + 1,
      name: kakaoPlace.place_name,
      address: kakaoPlace.road_address_name || kakaoPlace.address_name,
      description: `${kakaoPlace.category_name}${kakaoPlace.phone ? ` | ${kakaoPlace.phone}` : ''}`,
      locationImage: '',
      latitude: parseFloat(kakaoPlace.y),
      longitude: parseFloat(kakaoPlace.x),
      relatedContents: [],
    };
  }, []);

  const clearResults = useCallback(() => {
    onPlacesChange?.([]);
  }, [onPlacesChange]);

  const searchPlaces = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) {
        clearResults();
        return;
      }

      setIsLoading(true);

      if (!placesServiceRef.current || !isKakaoMapsLoaded()) {
        clearResults();
        setIsLoading(false);
        return;
      }

      const placesService = placesServiceRef.current as {
        keywordSearch: (
          query: string,
          callback: (data: KakaoPlace[], status: unknown) => void,
        ) => void;
      };

      placesService.keywordSearch(searchQuery, (data: KakaoPlace[], status: unknown) => {
        setIsLoading(false);

        const kakao = getKakaoMaps();
        const kakaoStatus = kakao?.maps?.services?.Status;

        if (status === kakaoStatus?.OK) {
          const places: Place[] = data.map((place, index) =>
            convertKakaoPlaceToPlace(place, index),
          );
          onPlacesChange?.(places);
        } else {
          clearResults();
        }
      });
    },
    [convertKakaoPlaceToPlace, clearResults, onPlacesChange],
  );

  const handleSearch = useCallback(
    (searchQuery: string) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        searchPlaces(searchQuery);
      }, debounceMs);
    },
    [searchPlaces, debounceMs],
  );

  const clearSearch = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    clearResults();
  }, [clearResults]);

  return {
    isLoading,
    handleSearch,
    clearSearch,
  };
}
