// 콘텐츠 관련 타입 정의
export type PopularContent = {
  contentId: number;
  category: 'DRAMA' | 'MOVIE' | 'POP';
  title: string;
  posterImageUrl: string;
  rank: number;
};

export type ContentLocation = {
  locationId: number;
  name: string;
  sceneDescription: string;
};

export type ContentDetail = {
  contentId: number;
  category: 'DRAMA' | 'MOVIE' | 'POP';
  title: string;
  posterImageUrl: string;
  releaseDate: string;
  locations: ContentLocation[];
};

//카테고리별 콘텐츠 타입 추가
// 카테고리별 콘텐츠 타입 추가
export type CategoryContent = {
  contentId: number;
  category: 'DRAMA' | 'MOVIE' | 'POP';
  title: string;
  posterImageUrl: string;
  releaseDate: string;
};

export type CategoryContentsResponse = {
  status: number;
  message: string;
  data: CategoryContent[];
};
