import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface SavedLocation {
  locationId: number;
  name: string;
  image: string;
  address: string;
  description: string;
}

interface SavedRoute {
  routeId: number;
  name: string;
  locations: string[];
  createdAt: string;
  description: string;
}

// Mock API functions (실제 구현 시 API로 교체)
const fetchSavedLocations = async (): Promise<SavedLocation[]> => {
  // 실제로는 API 호출
  return [
    {
      locationId: 101,
      name: '경복궁',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      address: '서울특별시 종로구 사직로 161',
      description: '조선 왕조의 첫 번째이자 가장 큰 궁궐로, 한국의 대표적인 문화유산입니다.',
    },
    {
      locationId: 102,
      name: '부산 해운대',
      image: 'https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?w=800&h=600&fit=crop',
      address: '부산광역시 해운대구 해운대해변로',
      description: '부산의 대표적인 해변으로 아름다운 백사장과 다양한 액티비티를 즐길 수 있습니다.',
    },
    {
      locationId: 103,
      name: '제주 성산일출봉',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
      address: '제주특별자치도 서귀포시 성산읍',
      description: '제주도의 대표적인 관광명소로 일출 명소로 유명합니다.',
    },
    {
      locationId: 104,
      name: 'N서울타워',
      image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=600&fit=crop',
      address: '서울특별시 용산구 남산공원길 105',
      description: '서울의 상징적인 랜드마크로 환상적인 야경을 감상할 수 있습니다.',
    },
    {
      locationId: 105,
      name: '남이섬',
      image: 'https://images.unsplash.com/photo-1517639493569-5666a7b2f494?w=800&h=600&fit=crop',
      address: '강원도 춘천시 남산면 남이섬길 1',
      description: '사계절 아름다운 풍경을 자랑하는 낭만적인 섬입니다.',
    },
    {
      locationId: 106,
      name: '전주 한옥마을',
      image: 'https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=800&h=600&fit=crop',
      address: '전라북도 전주시 완산구 기린대로 99',
      description: '전통 한옥과 맛집이 가득한 문화의 거리입니다.',
    },
  ];
};

const fetchSavedRoutes = async (): Promise<SavedRoute[]> => {
  // 실제로는 API 호출
  return [
    {
      routeId: 1,
      name: '서울 전통문화 투어',
      locations: ['경복궁', '북촌 한옥마을', '인사동', '남산 한옥마을', 'N서울타워'],
      createdAt: '2024.03.15',
      description:
        '서울의 전통과 현대가 어우러진 매력적인 문화 코스를 따라 하루 여행을 떠나보세요.',
    },
    {
      routeId: 2,
      name: '부산 해안 드라이브',
      locations: ['해운대', '달맞이길', '청사포', '송정해수욕장', '해동 용궁사'],
      createdAt: '2024.03.10',
      description: '부산의 아름다운 해안선을 따라 펼쳐지는 환상적인 바다 여행 코스입니다.',
    },
    {
      routeId: 3,
      name: '제주 동부 일주',
      locations: ['성산일출봉', '섭지코지', '우도', '비자림', '만장굴'],
      createdAt: '2024.03.05',
      description: '제주도 동쪽의 숨은 명소들을 찾아 떠나는 힐링 여행 코스입니다.',
    },
  ];
};

const deleteSavedLocation = async (locationId: number): Promise<void> => {
  // 실제로는 API 호출
  console.log(`Deleting location ${locationId}`);
};

const deleteSavedRoute = async (routeId: number): Promise<void> => {
  // 실제로는 API 호출
  console.log(`Deleting route ${routeId}`);
};

export const useMyPage = () => {
  const queryClient = useQueryClient();

  // 저장된 장소 조회
  const {
    data: savedLocations = [],
    isLoading: locationsLoading,
    isError: locationsError,
  } = useQuery({
    queryKey: ['savedLocations'],
    queryFn: fetchSavedLocations,
    staleTime: 5 * 60 * 1000,
  });

  // 저장된 동선 조회
  const {
    data: savedRoutes = [],
    isLoading: routesLoading,
    isError: routesError,
  } = useQuery({
    queryKey: ['savedRoutes'],
    queryFn: fetchSavedRoutes,
    staleTime: 5 * 60 * 1000,
  });

  // 장소 삭제 mutation
  const deleteLocationMutation = useMutation({
    mutationFn: deleteSavedLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedLocations'] });
    },
  });

  // 동선 삭제 mutation
  const deleteRouteMutation = useMutation({
    mutationFn: deleteSavedRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedRoutes'] });
    },
  });

  const deleteLocation = (locationId: number) => {
    deleteLocationMutation.mutate(locationId);
  };

  const deleteRoute = (routeId: number) => {
    deleteRouteMutation.mutate(routeId);
  };

  return {
    savedLocations,
    savedRoutes,
    isLoading: locationsLoading || routesLoading,
    isError: locationsError || routesError,
    deleteLocation,
    deleteRoute,
  };
};
