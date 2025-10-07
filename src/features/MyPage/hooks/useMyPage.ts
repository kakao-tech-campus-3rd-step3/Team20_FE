import { useQuery } from '@tanstack/react-query';
import { getLocationDetail } from '../../../entities/location/api/locationApi';
import type { TravelCardData } from '../model/types';

export const useMyPage = () => {
  const locationIds = ['101', '102', '103'];

  const locationQueries = locationIds.map((id) =>
    useQuery({
      queryKey: ['location', id],
      queryFn: () => getLocationDetail(id),
      staleTime: 5 * 60 * 1000, // 5분
    }),
  );

  const isLoading = locationQueries.some((query) => query.isLoading);
  const isError = locationQueries.some((query) => query.isError);
  
  // API 데이터를 TravelCardData 형태로 변환
  const travelCards: TravelCardData[] = locationQueries
    .filter((query) => query.data)
    .map((query) => {
      const location = query.data!;
      return {
        title: location.name,
        image: location.locationImage,
        description: location.description,
        additionalText: location.address
      };
    });

  // 로딩 중이거나 데이터가 없을 때 기본 mock 데이터 사용
  if (isLoading || travelCards.length === 0) {
    const mockTravelCards: TravelCardData[] = [
      {
        title: 'Beach Paradise',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor congue massa. Fusce posuere.',
        additionalText: 'Nunc viverra imperdiet enim. Fusce est.'
      },
      {
        title: 'Travel Essentials',
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor congue massa. Fusce posuere.',
        additionalText: ''
      },
      {
        title: 'Mountain Adventure',
        image: 'https://images.unsplash.com/photo-1464822759844-d150baec93d5?w=400&h=300&fit=crop',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor congue massa. Fusce posuere.',
        additionalText: 'Nunc viverra imperdiet enim. Fusce est.'
      }
    ];
    
    return {
      travelCards: mockTravelCards,
      isLoading,
      isError,
    };
  }

  return {
    travelCards,
    isLoading,
    isError,
  };
};
