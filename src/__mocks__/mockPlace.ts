import type { Place } from '@/features/Sidebar/model/types';

import place1 from './images/squidgame-spotdetail.jpg';
import place2 from './images/squidgame-spotdetail2.jpg';
import place3 from './images/squidgame-spotdetail3.png';
import place4 from './images/squidgame-spotdetail4.png';

const thumbnails = [place1, place2, place3, place4];

export const MOCK_PLACES: Place[] = [
  {
    locationId: 1,
    name: '대한봉진학교',
    address: '경기도 안산시 상록구',
    description: '무궁화꽃이 피었습니다 장면이 촬영된 학교입니다.',
    imageUrl: [thumbnails[0]],
    latitude: 37.3234,
    longitude: 126.8321,
    relatedContents: [{ contentId: 5, title: '오징어게임', category: 'DRAMA' }],
  },
  {
    locationId: 2,
    name: '무의도',
    address: '인천광역시 중구',
    description: '세트장이 위치했던 섬으로 알려진 장소입니다.',
    imageUrl: [thumbnails[1]],
    latitude: 37.4222,
    longitude: 126.3777,
    relatedContents: [{ contentId: 5, title: '오징어게임', category: 'DRAMA' }],
  },
  {
    locationId: 3,
    name: '서울대공원',
    address: '경기도 과천시 막계동',
    description: '야외 구슬치기 장면이 촬영된 장소입니다.',
    imageUrl: [thumbnails[2]],
    latitude: 37.4361,
    longitude: 127.0162,
    relatedContents: [{ contentId: 5, title: '오징어게임', category: 'DRAMA' }],
  },
  {
    locationId: 4,
    name: '삼척 해신당공원',
    address: '강원도 삼척시 근덕면',
    description: '절벽 줄다리기 장면으로 유명한 명소입니다.',
    imageUrl: [thumbnails[3]],
    latitude: 37.3855,
    longitude: 129.2265,
    relatedContents: [{ contentId: 5, title: '오징어게임', category: 'DRAMA' }],
  },
];
