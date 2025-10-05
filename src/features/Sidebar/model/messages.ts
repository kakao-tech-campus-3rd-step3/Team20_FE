export const PLACE_CARD_DEFAULT = {
  NAME: '장소 이름',
  ADDRESS: '주소 정보',
  TAGS: ['촬영지'],
  RATING: 4.8,
};

export const SIDEBAR_TITLES = {
  HEADER_TITLE: '촬영지 검색',
  FOOTER_TITLE: '🎬 촬영지 탐방',
  SEARCH_SUBTITLE: '촬영지를 검색해보세요',
};

export const SIDEBAR_STATUS_TEXT = {
  LOADING: '로딩 중...',
  ERROR: '오류가 발생했습니다.',
} as const;

export const SIDEBAR_SEARCH_TEXT = {
  PLACEHOLDER: '작품명 검색... (예: 오징어게임, 기생충)',
  TIP: '💡 팁: 작품명을 입력하면 해당 작품의 촬영지가 표시됩니다',
  COMPLETED: '검색 완료',
};

export const PLACE_LABELS = {
  SCENE: '촬영 장면',
} as const;

export const SIDEBAR_EMPTY_STATE = {
  TITLE: '촬영지를 검색해보세요',
  DESCRIPTION: '드라마, 영화, 아티스트의 촬영지를 검색하고 지도에서 확인해보세요.',
  SEARCH_TIPS: {
    DRAMA: '드라마명으로 검색 (예: 오징어게임)',
    MOVIE: '영화명으로 검색 (예: 기생충)',
    POP: '아티스트명으로 검색 (예: BTS)',
  },
} as const;

export const SIDEBAR_SEARCH_RESULTS = {
  TITLE: '검색 결과',
  NO_RESULTS_TITLE: '검색 결과가 없습니다',
  NO_RESULTS_DESCRIPTION: '다른 키워드로 시도해보세요.',
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
  SAVE: '💾',
  ESTIMATED_TIME: '⏱️ 예상 소요시간',
} as const;

export const formatFoundCount = (n: number) => `${n}개의 촬영지를 찾았습니다`;
export const formatLocations = (n: number) => `📍 ${n}개 장소`;
export const formatAvgRating = (avg: number) => `⭐ 평균 ${avg.toFixed(1)}점`;
export const formatDuration = (range: readonly [number, number]) =>
  `⏱️ ${range[0]}-${range[1]}시간`;
export const formatRouteCount = (n: number) => `${n}개 장소 추가됨`;
