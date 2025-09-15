import type { Place } from '@/features/Sidebar/model/types';

import place1 from './images/squidgame-spotdetail.jpg';
import place2 from './images/squidgame-spotdetail2.jpg';
import place3 from './images/squidgame-spotdetail3.png';
import place4 from './images/squidgame-spotdetail4.png';

const thumbnails = [place1, place2, place3, place4];

export const MOCK_PLACES: Place[] = [
  {
    id: '1',
    name: '대한봉진학교',
    address: '경기도 안산시 상록구',
    tags: ['메인 촬영지', '학교', '무궁화꽃이 피었습니다'],
    rating: 4.8,
    thumbnailUrl: thumbnails[0],
  },
  {
    id: '2',
    name: '무의도',
    address: '인천광역시 중구',
    tags: ['세트장', '무인도', '해안'],
    rating: 4.7,
    thumbnailUrl: thumbnails[1],
  },
  {
    id: '3',
    name: '서울대공원',
    address: '경기도 과천시 막계동',
    tags: ['구슬치기', '대형 세트', '야외 촬영'],
    rating: 4.6,
    thumbnailUrl: thumbnails[2],
  },
  {
    id: '4',
    name: '삼척 해신당공원',
    address: '강원도 삼척시 근덕면',
    tags: ['줄다리기', '해안 절벽', '전망 명소'],
    rating: 4.5,
    thumbnailUrl: thumbnails[3],
  },
];
