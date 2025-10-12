import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { getLocationDetail } from './locationApi';
import { locationQueryKeys } from './queryKeys';
import type { LocationDetail } from '../model/types';

export const useLocationDetail = (locationId: string): UseQueryResult<LocationDetail, Error> => {
  return useQuery<LocationDetail, Error>({
    queryKey: locationQueryKeys.detail(locationId),
    queryFn: () => getLocationDetail(locationId),
  });
};
