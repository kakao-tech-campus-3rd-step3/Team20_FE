export const ROUTE_BUTTON_TEXT = {
  ADD_TO_ROUTE: '동선에 추가하기',
  ADDED_TO_ROUTE: '동선에 추가됨',
} as const;

export const ROUTE_SIDEBAR_TITLES = {
  HEADER_TITLE: '동선 계획',
  SUBTITLE: '추가된 장소를 확인하고 순서를 조정하세요',
  EMPTY_TITLE: '동선에 장소를 추가해보세요',
  EMPTY_DESCRIPTION: '좌측에서 장소를 선택하고 "동선에 추가하기" 버튼을 눌러보세요.',
} as const;

export const ROUTE_SIDEBAR_BUTTONS = {
  SAVE_ROUTE: '동선 저장하기',
  REORDER: '순서 조정',
  REMOVE: '제거',
} as const;

export const ROUTE_SIDEBAR_STYLES = {
  SAVE_BUTTON:
    'w-full flex items-center justify-center gap-(--spacing-2) px-(--spacing-4) py-(--spacing-3) rounded-lg text-button font-medium transition-all duration-200 shadow-(--shadow-button) hover:shadow-(--shadow-button-hover) bg-(--color-brand-primary) text-(--color-text-inverse) hover:bg-(--color-brand-secondary)',
} as const;

export const ROUTE_SIDEBAR_ICONS = {
  MAP: '🗺️',
  SAVE: '💾',
  SAVE_ICON_PATH:
    'M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12',
} as const;

export const formatRouteCount = (n: number) => `${n}개 장소 추가됨`;
export const formatLocations = (n: number) => `📍 ${n}개 장소`;

// 저장 모달 관련 상수
export const SAVE_ROUTE_MODAL = {
  TITLE: '동선 저장하기',
  FORM_LABELS: {
    TITLE: '제목 *',
    DESCRIPTION: '설명 (선택사항)',
  },
  PLACEHOLDERS: {
    TITLE: '동선의 제목을 입력해주세요',
    DESCRIPTION: '동선에 대한 설명을 입력해주세요',
  },
  BUTTONS: {
    CANCEL: '취소',
    SAVE: '저장하기',
    SAVING: '저장 중...',
  },
  MESSAGES: {
    PLACES_COUNT: (count: number) => `총 ${count}개의 장소가 저장됩니다.`,
  },
  VALIDATION: {
    TITLE_REQUIRED: '제목을 입력해주세요.',
    NO_PLACES: '저장할 장소가 없습니다.',
    SAVE_FAILED: '동선 저장에 실패했습니다. 다시 시도해주세요.',
  },
  LIMITS: {
    TITLE_MAX_LENGTH: 50,
    DESCRIPTION_MAX_LENGTH: 200,
  },
  SUCCESS: {
    TITLE: '동선 저장 완료',
    MESSAGE: '성공적으로 동선을 저장하였습니다. 동선은 마이페이지에서 확인할 수 있습니다.',
    GO_MYPAGE: '마이페이지 바로 가기',
  },
} as const;
