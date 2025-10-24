// 콘텐츠 관련 타입 정의
export type PopularContent = {
  contentId: number;
  category: 'DRAMA' | 'MOVIE' | 'POP';
  title: string;
  posterImageUrl: string;
};

export type PopularResponse = {
  items: PopularContent[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
};
export type ContentLocation = {
  location_id: number;
  name: string;
  scene_description: string;
  location_image_url: string;
  contentId: number;
};

export type Artist = {
  artistId: number;
  name: string;
};

export type ContentDetail = {
  contentId: number;
  category: 'DRAMA' | 'MOVIE' | 'POP';
  title: string;
  releaseDate: string;
  posterImageUrl: string;
  posterImageUrlVertical: string;
  description: string;
  artists: Artist[];
};

// 카테고리별 콘텐츠 타입
export type CategoryContent = {
  contentId: number;
  title: string;
  posterImageUrl: string;
  category?: 'DRAMA' | 'MOVIE' | 'POP';
  releaseDate?: string;
};
