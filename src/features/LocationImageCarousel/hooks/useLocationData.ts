import { useSuspenseQuery } from '@tanstack/react-query';
import { getLocationDetail } from '@/entities/location/api/locationApi';
import { getContentLocations } from '@/entities/content/api/contentApi';
import { useContentDetail } from '@/entities/content/api/queryfn';

export function useLocationData(contentId: string) {
  const { data: contentDetail } = useContentDetail(contentId);

  // 콘텐츠 관련 장소 목록 조회
  const { data: contentLocations = [] } = useSuspenseQuery({
    queryKey: ['content-locations', contentId],
    queryFn: () => getContentLocations(contentId),
  });

  // 각 locationId로 장소 상세 정보 병렬 조회
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

  return { locations, contentDetail };
}
