import { http } from '@/shared/api';
import type { LocationDetail } from '../model/types';

// 장소 상세 정보 조회
export const getLocationDetail = async (locationId: string): Promise<LocationDetail> => {
  return http.get(`/locations/${locationId}`);
};
