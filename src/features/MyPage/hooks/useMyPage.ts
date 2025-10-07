import type { TravelCardData } from '../model/types';

export const useMyPage = () => {
  // 이미지와 동일한 3개의 카드 데이터
  const travelCards: TravelCardData[] = [
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
    travelCards,
  };
};
