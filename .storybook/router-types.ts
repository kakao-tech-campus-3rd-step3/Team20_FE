declare module '@storybook/react' {
  interface Parameters {
    router?: {
      /**
       * 초기 라우트 경로 목록
       * @example ['/content/123', '/location/456']
       */
      initialEntries?: string[];

      /**
       * 초기 라우트 인덱스
       * @default 0
       */
      initialIndex?: number;

      /**
       * 현재 라우트 경로 패턴
       * @example '/content/$id'
       */
      path?: string;

      /**
       * 라우트 파라미터
       * @example { id: '123', contentId: 'squidgame' }
       */
      params?: Record<string, string>;

      /**
       * 검색 파라미터 (쿼리 스트링)
       * @example { tab: 'overview', page: '1' }
       */
      search?: Record<string, string>;

      //라우터 컨텍스트
      context?: Record<string, any>;
    };
  }
}

//Storybook Story에서 사용할 수 있는 라우터 설정 타입
export interface RouterStoryConfig {
  //초기 라우트 경로 목록
  initialEntries?: string[];

  //초기 라우트 인덱스
  initialIndex?: number;

  //현재 라우트 경로 패턴
  path?: string;

  //라우트 파라미터
  params?: Record<string, string>;

  //검색 파라미터터
  search?: Record<string, string>;

  //라우터 컨텍스트
  context?: Record<string, any>;
}

//주요 라우트 경로 상수
export const ROUTE_PATHS = {
  HOME: '/',
  CONTENT_DETAIL: '/content/$id',
  CONTENT_MAP: '/content/$contentId/map',
  LOCATION_DETAIL: '/location/$id',
  MAP: '/map',
} as const;

//자주 사용되는 라우터 설정 프리셋
export const ROUTER_PRESETS = {
  //홈페이지
  HOME: {
    initialEntries: ['/'],
    path: '/',
  },

  //콘텐츠 상세 페이지
  CONTENT_DETAIL: (contentId: string = '123') => ({
    initialEntries: [`/content/${contentId}`],
    path: '/content/$id',
    params: { id: contentId },
  }),

  //콘텐츠 지도 페이지
  CONTENT_MAP: (contentId: string = '123') => ({
    initialEntries: [`/content/${contentId}/map`],
    path: '/content/$contentId/map',
    params: { contentId },
  }),

  //장소 상세 페이지
  LOCATION_DETAIL: (locationId: string = '456') => ({
    initialEntries: [`/location/${locationId}`],
    path: '/location/$id',
    params: { id: locationId },
  }),

  //지도 페이지
  MAP: {
    initialEntries: ['/map'],
    path: '/map',
  },
} as const;
