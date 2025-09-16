// 콘텐츠 관련 타입 정의

export interface PopularContent {
  rank: number;
  contentId: number;
  category: 'DRAMA' | 'MOVIE' | 'POP';
  title: string;
  posterImageUrl: string;
}

export interface ContentLocation {
  locationId: number;
  name: string;
  sceneDescription: string;
}

export interface ContentDetail {
  contentId: number;
  category: 'DRAMA' | 'MOVIE' | 'POP';
  title: string;
  posterImageUrl: string;
  releaseDate: string;
  locations: ContentLocation[];
}
