export const PLACE_CARD_DEFAULT = {
  NAME: '장소 이름',
  ADDRESS: '주소 정보',
  TAGS: ['촬영지', '메인', '게임'],
  RATING: 4.8,
};

export const SIDEBAR_TITLES = {
  HEADER_TITLE: '오징어 게임 촬영지',
  FOOTER_TITLE: '🎬 오징어 게임 촬영지 탐방',
  SEARCH_TITLE: '촬영지 검색',
  SEARCH_SUBTITLE: '촬영지를 검색해보세요',
  FOOTER_SEARCH_TEXT: '🔍 원하는 촬영지를 검색해보세요',
};

export const SIDEBAR_STATUS_TEXT = {
  LOADING: '로딩 중...',
  ERROR: '오류가 발생했습니다.',
} as const;

export const SIDEBAR_SEARCH_TEXT = {
  PLACEHOLDER: '촬영지 검색... (예: 오징어게임, 대한봉진학교)',
  TIP: '💡 팁: "오징어게임"으로 검색하면 모든 촬영지가 표시됩니다',
  COMPLETED: '검색 완료',
};

export const PLACE_LABELS = {
  SCENE: '촬영 장면',
} as const;

export const SIDEBAR_EMPTY_STATE = {
  TITLE: '촬영지를 검색해보세요',
  DESCRIPTION: '드라마, 영화, 예능 프로그램의 촬영지를 검색하고 지도에서 확인해보세요.',
  SEARCH_TIPS: {
    DRAMA: '드라마명으로 검색 (예: 오징어게임)',
    PLACE: '장소명으로 검색 (예: 더현대)',
    REGION: '지역명으로 검색 (예: 강남구)',
  },
} as const;

export const SIDEBAR_SEARCH_RESULTS = {
  NO_RESULTS_TITLE: '검색 결과',
  NO_RESULTS_DESCRIPTION: '검색 결과가 없습니다. 다른 키워드로 시도해보세요.',
  RESULTS_COUNT: '개의 장소를 찾았습니다',
} as const;

export const ROUTE_BUTTON_TEXT = {
  ADD_TO_ROUTE: '동선에 추가하기',
  ADDED_TO_ROUTE: '동선에 추가됨',
} as const;

export const PLACE_CARD_LABELS = {
  RELATED_CONTENTS: '관련 콘텐츠',
  LOCATION: '위치',
} as const;

export const ROUTE_SIDEBAR_TITLES = {
  HEADER_TITLE: '동선 계획',
  SUBTITLE: '추가된 장소를 확인하고 순서를 조정하세요',
  EMPTY_TITLE: '동선에 장소를 추가해보세요',
  EMPTY_DESCRIPTION: '좌측에서 장소를 선택하고 "동선에 추가하기" 버튼을 눌러보세요.',
  FOOTER_TITLE: '🗺️ 나만의 동선 만들기',
} as const;

export const ROUTE_SIDEBAR_BUTTONS = {
  SAVE_ROUTE: '동선 저장하기',
  REORDER: '순서 조정',
  REMOVE: '제거',
} as const;

export const ROUTE_SIDEBAR_ICONS = {
  MAP: '🗺️',
  SAVE: 'M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12',
  ESTIMATED_TIME: '⏱️ 예상 소요시간',
} as const;

export const formatFoundCount = (n: number) => `${n}개의 촬영지를 찾았습니다`;
export const formatLocations = (n: number) => `📍 ${n}개 장소`;
export const formatAvgRating = (avg: number) => `⭐ 평균 ${avg.toFixed(1)}점`;
export const formatDuration = (range: readonly [number, number]) =>
  `⏱️ ${range[0]}-${range[1]}시간`;
export const formatRouteCount = (n: number) => `${n}개 장소 추가됨`;
