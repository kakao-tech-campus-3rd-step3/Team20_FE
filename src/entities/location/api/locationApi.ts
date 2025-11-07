import { httpBackend } from '@/shared/api/httpBackend';
import type { LocationDetail } from '../model/types';

const createDefaultLocationDetail = (locationId: string): LocationDetail => ({
  locationId: parseInt(locationId, 10),
  name: '알 수 없는 장소',
  address: '주소 정보 없음',
  latitude: 0,
  longitude: 0,
  description: '장소 정보를 불러올 수 없습니다.',
  imageUrl: [],
  relatedContents: [],
});

// 장소 상세 정보 조회
export const getLocationDetail = async (locationId: string): Promise<LocationDetail> => {
  try {
    const response = await httpBackend.get(`/locations/${locationId}`);

    if (!response) {
      return createDefaultLocationDetail(locationId);
    }

    return response as unknown as LocationDetail;
  } catch {
    return createDefaultLocationDetail(locationId);
  }
};

// 리뷰 API는 location-review 엔티티로 이동
