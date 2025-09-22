export const OVERLAY_MESSAGES = {
  closeButton: '오버레이 닫기',
  sceneLabel: '촬영 장면',
  relatedContentsPrefix: '관련 콘텐츠: ',
  coordinatesPrefix: '위치: ',
} as const;

export const ERROR_MESSAGES = {
  sdkNotReady: 'Kakao Maps SDK not available',
  sdkTimeout: 'Kakao SDK not ready (15s timeout).',
  mapInitFailed: 'Kakao map init failed. Check JS key / domain / HTTPS / CSP.',
} as const;

export const STATUS_MESSAGES = {
  loading: '지도를 불러오는 중...',
  error: '지도를 불러올 수 없습니다.',
  noPlaces: '표시할 장소가 없습니다.',
} as const;
