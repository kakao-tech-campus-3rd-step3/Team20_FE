import { useSuspenseQuery } from '@tanstack/react-query';
import { getLocationDetail } from '@/entities/location/api/locationApi';
import { getContentLocations } from '@/entities/content/api/contentApi';
import type { ContentLocation } from '@/entities/content/model/types';

export function useLocationData(contentId: string) {
  const { data: contentLocations = [] } = useSuspenseQuery({
    queryKey: ['content-locations', contentId],
    queryFn: () => getContentLocations(contentId),
    select: (res: ContentLocation[]) =>
      Array.isArray(res) ? res : (res as unknown as ContentLocation[]),
  });

  const { data: locations = [] } = useSuspenseQuery({
    queryKey: ['locations', contentLocations?.map((loc) => loc.locationId) || []],
    queryFn: async () => {
      if (!contentLocations || contentLocations.length === 0) {
        return [];
      }
      const locationPromises = contentLocations.map((location) =>
        getLocationDetail(location.locationId.toString()),
      );
      return Promise.all(locationPromises);
    },
  });

  return { locations, contentLocations };
}
