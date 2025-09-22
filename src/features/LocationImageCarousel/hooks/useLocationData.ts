import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getLocationDetail } from '@/entities/location/api/locationApi';
import { useContentDetail } from '@/entities/content/api/queryfn';
export function useLocationData(contentId: string) {
  const { data: contentDetail } = useContentDetail(contentId);
  // locations 배열에서 locationId들 추출
  const locationIds = useMemo(() => {
    return contentDetail?.locations?.map((location) => location.locationId) || [];
  }, [contentDetail?.locations]);

  // 각 locationId로 장소 상세 정보 병렬 조회
  const { data: locations = [] } = useSuspenseQuery({
    queryKey: ['locations', locationIds],
    queryFn: async () => {
      const locationPromises = locationIds.map((locationId) =>
        getLocationDetail(locationId.toString()),
      );
      return Promise.all(locationPromises);
    },
  });

  return { locations, contentDetail };
}
