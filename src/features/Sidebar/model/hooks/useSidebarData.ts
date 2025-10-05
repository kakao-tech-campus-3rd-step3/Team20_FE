import { useQuery } from '@tanstack/react-query';
import { getContentDetail, getContentLocations } from '@/entities/content/api/contentApi';
import { contentQueryKeys } from '@/entities/content/api/queryKeys';
import { hasAddress, convertLocationsToPlaces } from '../utils';
import type { Place } from '../types';
import type { ContentLocation } from '@/entities/content/model/types';

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

      const contentLocations = locations.filter(
        (location): location is ContentLocation => !hasAddress(location),
      );
      const convertedPlaces = await convertLocationsToPlaces(contentLocations);
      const existingPlaces = locations.filter(hasAddress) as unknown as Place[];

      return [...convertedPlaces, ...existingPlaces];
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
