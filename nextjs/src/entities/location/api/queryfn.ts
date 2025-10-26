'use client';

import { useSuspenseQuery, type UseSuspenseQueryResult } from '@tanstack/react-query';
import { getLocationDetail } from './locationApi';
import { locationQueryKeys } from './queryKeys';
import type { LocationDetail } from '../model/types';

export const useLocationDetail = (
  locationId: string,
): UseSuspenseQueryResult<LocationDetail, Error> => {
  return useSuspenseQuery<LocationDetail, Error>({
    queryKey: locationQueryKeys.detail(locationId),
    queryFn: () => getLocationDetail(locationId),
  });
};
