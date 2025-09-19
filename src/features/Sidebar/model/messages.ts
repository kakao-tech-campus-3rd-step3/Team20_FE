export const PLACE_CARD_DEFAULT = {
  NAME: '장소 이름',
  ADDRESS: '주소 정보',
  TAGS: ['촬영지', '메인', '게임'],
  RATING: 4.8,
};

export const SIDEBAR_TITLES = {
  HEADER_TITLE: '오징어 게임 촬영지',
  FOOTER_TITLE: '🎬 오징어 게임 촬영지 탐방',
};

export const SIDEBAR_STATUS_TEXT = {
  LOADING: '로딩 중...',
  ERROR: '오류가 발생했습니다.',
} as const;

export const SIDEBAR_SEARCH_TEXT = {
  PLACEHOLDER: '촬영지 검색... (예: 오징어게임, 대한봉진학교)',
  TIP: '💡 팁: "오징어게임"으로 검색하면 모든 촬영지가 표시됩니다',
};

export const PLACE_LABELS = {
  SCENE: '촬영 장면',
} as const;

export const formatFoundCount = (n: number) => `${n}개의 촬영지를 찾았습니다`;
export const formatLocations = (n: number) => `📍 ${n}개 장소`;
export const formatAvgRating = (avg: number) => `⭐ 평균 ${avg.toFixed(1)}점`;
export const formatDuration = (range: readonly [number, number]) =>
  `⏱️ ${range[0]}-${range[1]}시간`;
