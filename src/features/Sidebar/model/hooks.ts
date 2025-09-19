import { useQuery } from '@tanstack/react-query';
import { getContentDetail, getContentLocations } from '@/entities/content/api/contentApi';
import { getLocationDetail } from '@/entities/location/api/locationApi';
import type { Place } from '../model/types';
import type { ContentLocation } from '@/entities/content/model/types';
import type { LocationDetail } from '@/entities/location/model/types';

export function useSidebarData(contentId?: string) {
  const { data: contentDetail } = useQuery({
    queryKey: ['contentDetail', contentId],
    queryFn: () => getContentDetail(contentId || ''),
    enabled: !!contentId,
  });

  const {
    data: places = [],
    isLoading,
    error,
  } = useQuery<Place[]>({
    queryKey: ['contentLocations', contentId],
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
              return await getLocationDetail(location.locationId.toString());
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
