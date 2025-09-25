// 장소 관련 타입 정의

export interface RelatedContent {
  contentId: number;
  title: string;
  category: 'DRAMA' | 'MOVIE' | 'POP';
}

export interface LocationDetail {
  locationId: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  locationImage: string;
  relatedContents: RelatedContent[];
}
