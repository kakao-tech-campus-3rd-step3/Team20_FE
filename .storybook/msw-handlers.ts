import { http, HttpResponse } from 'msw';

/**
 * MSW 핸들러 정의
 * mock.md 파일의 API 응답을 기반으로 생성
 */

const BASE_URL = 'https://d2d0fud3w2c5j6.cloudfront.net';

export const handlers = [
  // 콘텐츠 상세 조회
  http.get(`${BASE_URL}/contents/:contentId`, ({ params }) => {
    const { contentId } = params;

    return HttpResponse.json({
      status: 200,
      message: '콘텐츠 상세 정보 조회 성공',
      data: {
        contentId: Number(contentId),
        category: 'DRAMA',
        title: contentId === '1' ? '이두나' : `콘텐츠 ${contentId}`,
        releaseDate: '2024-03-09',
        posterImageUrl:
          'https://github.com/Jaeho-Site/mock-test-images/blob/main/k-drama-doona-horizontal.jpg?raw=true',
        posterImageUrlVertical:
          'https://github.com/Jaeho-Site/mock-test-images/blob/main/k-drama-doona.webp?raw=true',
        description:
          "평범한 대학생인 '이원준'이 은퇴한 전직 아이돌 '이두나'가 사는 셰어하우스에 살게 되면서 벌어지는 로맨스 이야기",
        artists: [
          {
            artistId: 201,
            name: '수지',
          },
          {
            artistId: 202,
            name: '양세종',
          },
        ],
      },
    });
  }),

  // 인기 콘텐츠 Top 10 조회
  http.get(`${BASE_URL}/contents`, () => {
    console.log('🎭 MSW: /contents 요청 처리됨', new Date().toLocaleTimeString());
    return HttpResponse.json({
      status: 200,
      message: '인기 콘텐츠 Top 10 조회 성공',
      data: [
        {
          contentId: 1,
          title: '이두나',
          posterImageUrl:
            'https://github.com/Jaeho-Site/mock-test-images/blob/main/k-drama-doona.webp?raw=true',
        },
        {
          contentId: 2,
          title: '이태원 클라스',
          posterImageUrl:
            'https://github.com/Jaeho-Site/mock-test-images/blob/main/k-drama-itaewonClass.webp?raw=true',
        },
        {
          contentId: 3,
          title: '더 글로리',
          posterImageUrl:
            'https://github.com/Jaeho-Site/mock-test-images/blob/main/k-drama-theglory.webp?raw=true',
        },
        {
          contentId: 4,
          title: '오징어 게임',
          posterImageUrl:
            'https://github.com/Jaeho-Site/mock-test-images/blob/main/k-drama-squidgame.webp?raw=true',
        },
        {
          contentId: 5,
          title: 'BTS',
          posterImageUrl:
            'https://github.com/Jaeho-Site/mock-test-images/blob/main/k-pop-bts.webp?raw=true',
        },
        {
          contentId: 6,
          title: '신과 함께',
          posterImageUrl:
            'https://github.com/Jaeho-Site/mock-test-images/blob/main/k-movie-withGod.webp?raw=true',
        },
        {
          contentId: 7,
          title: '이두나2',
          posterImageUrl:
            'https://github.com/Jaeho-Site/mock-test-images/blob/main/k-drama-doona.webp?raw=true',
        },
        {
          contentId: 8,
          title: '이태원 클라스2',
          posterImageUrl:
            'https://github.com/Jaeho-Site/mock-test-images/blob/main/k-drama-itaewonClass.webp?raw=true',
        },
        {
          contentId: 9,
          title: '더 글로리2',
          posterImageUrl:
            'https://github.com/Jaeho-Site/mock-test-images/blob/main/k-drama-theglory.webp?raw=true',
        },
        {
          contentId: 10,
          title: '오징어 게임2',
          posterImageUrl:
            'https://github.com/Jaeho-Site/mock-test-images/blob/main/k-drama-squidgame.webp?raw=true',
        },
      ],
    });
  }),

  // 콘텐츠 관련 장소 조회
  http.get(`${BASE_URL}/contents/:contentId/related-locations`, ({ params }) => {
    const { contentId } = params;

    return HttpResponse.json({
      status: 200,
      message: '콘텐츠 관련 장소 조회 성공',
      data: [
        {
          location_id: 102,
          name: '소피텔 앰배서더 서울',
          scene_description: '석촌호수 전망의 5성급 럭셔리 호텔입니다.',
          location_image_url:
            'https://github.com/Jaeho-Site/mock-test-images/blob/main/102-%EC%87%BC%ED%94%BC%EB%8D%94%ED%98%B8%ED%85%94.png?raw=true',
          contentId: Number(contentId),
        },
        {
          location_id: 104,
          name: '수원 행궁동',
          scene_description:
            '수원 화성 성곽길 아래 위치한, 레트로 감성의 카페와 맛집이 많은 동네입니다.',
          location_image_url:
            'https://github.com/Jaeho-Site/mock-test-images/blob/main/104-%EC%88%98%EC%9B%90%ED%96%89%EA%B6%81%EB%8F%99.png?raw=true',
          contentId: Number(contentId),
        },
        {
          location_id: 103,
          name: '보은 법주사',
          scene_description: "속리산에 위치한 아름다운 사찰로, 국보 '팔상전'이 유명합니다.",
          location_image_url:
            'https://github.com/Jaeho-Site/mock-test-images/blob/main/103-%EB%B3%B4%EC%9D%80%20%EB%B2%95%EC%A3%BC%EC%82%AC.png?raw=true',
          contentId: Number(contentId),
        },
        {
          location_id: 101,
          name: '더현대 서울',
          scene_description: 'MZ세대의 성지로 불리는 서울의 대표적인 백화점입니다.',
          location_image_url:
            'https://github.com/Jaeho-Site/mock-test-images/blob/main/101-%EB%8D%94%ED%98%84%EB%8C%80%EC%84%9C%EC%9A%B8.png?raw=true',
          contentId: Number(contentId),
        },
        {
          location_id: 105,
          name: '쌍문동 백운시장',
          scene_description:
            "드라마 '오징어 게임'와 '응답하라 1988'의 배경이 된 정겨운 재래시장입니다.",
          location_image_url:
            'https://github.com/Jaeho-Site/mock-test-images/blob/main/squidgame-spotdetail.jpg?raw=true',
          contentId: Number(contentId),
        },
      ],
    });
  }),

  // 장소 상세 조회
  http.get(`${BASE_URL}/locations/:locationId`, ({ params }) => {
    const { locationId } = params;

    return HttpResponse.json({
      status: 200,
      message: '장소 상세 조회 성공',
      data: {
        locationId: Number(locationId),
        name: locationId === '101' ? '더현대 서울' : `장소 ${locationId}`,
        address: '서울 영등포구 여의대로 108',
        latitude: 37.5258,
        longitude: 126.9285,
        description: 'MZ세대의 성지로 불리는 서울의 대표적인 백화점입니다.',
        locationImage:
          'https://github.com/Jaeho-Site/mock-test-images/blob/main/101-%EB%8D%94%ED%98%84%EB%8C%80%EC%84%9C%EC%9A%B8.png?raw=true',
        relatedContents: [
          {
            contentId: 4,
            title: 'BTS',
            category: 'POP',
          },
          {
            contentId: 5,
            title: '오징어게임',
            category: 'DRAMA',
          },
          {
            contentId: 6,
            title: '신과 함께',
            category: 'MOVIE',
          },
        ],
      },
    });
  }),

  // 모든 여행 계획 조회
  http.get(`${BASE_URL}/itineraries`, () => {
    return HttpResponse.json({
      status: 200,
      message: '모든 여행 계획 조회 성공',
      data: {
        count: 3,
        itineraries: [
          {
            createdAt: '2025-09-29T07:30:53.387784Z',
            itineraryId: '36174360-f244-4207-b808-a6a71d58f4ac',
            title: '쌍문동 백운시장에서 시작하는 랜덤 투어',
          },
          {
            createdAt: '2025-09-29T07:42:42.475639Z',
            itineraryId: '15a210e2-f06e-45d4-91e3-f6d013cc97d3',
            title: '랜덤 생성 여행 28',
          },
          {
            createdAt: '2025-09-29T10:20:12.684526Z',
            itineraryId: '10400997-1e59-4c04-8cbb-f2d52b019244',
            title: '랜덤 생성 여행 65',
          },
        ],
      },
    });
  }),

  // 여행 계획 상세 조회
  http.get(`${BASE_URL}/itineraries/:itineraryId`, ({ params }) => {
    const { itineraryId } = params;

    return HttpResponse.json({
      status: 200,
      message: '여행 계획 상세 조회 성공',
      data: {
        locations: [
          {
            locationId: 105,
            name: '쌍문동 백운시장',
            address: '서울 도봉구 우이천로 336',
            visitOrder: 1,
          },
          {
            locationId: 102,
            name: '소피텔 앰배서더 서울',
            address: '서울 송파구 잠실로 209',
            visitOrder: 2,
          },
          {
            locationId: 104,
            name: '수원 행궁동',
            address: '경기 수원시 팔달구 정조로 825',
            visitOrder: 3,
          },
          {
            locationId: 101,
            name: '더현대 서울',
            address: '서울 영등포구 여의대로 108',
            visitOrder: 4,
          },
          {
            locationId: 103,
            name: '보은 법주사',
            address: '충북 보은군 속리산면 법주사로 405',
            visitOrder: 5,
          },
        ],
        createdAt: '2025-09-29T07:30:53.387784Z',
        description: '5개의 멋진 장소를 둘러보는 여행입니다.',
        userId: 'test-user-123',
        itineraryId: itineraryId as string,
        title: '쌍문동 백운시장에서 시작하는 랜덤 투어',
        user: {
          userId: 'test-user-123',
          nickname: '테스트유저',
        },
      },
    });
  }),
];

/**
 * 스토리별 커스텀 핸들러를 위한 유틸리티 함수들
 */

// 로딩 상태 시뮬레이션
export const createDelayedHandler = (handler: (info: unknown) => unknown, delay: number = 1000) => {
  return async (info: unknown) => {
    await new Promise((resolve) => setTimeout(resolve, delay));
    return handler(info);
  };
};

// 에러 상태 시뮬레이션
export const createErrorHandler = (
  status: number = 500,
  message: string = '서버 오류가 발생했습니다',
) => {
  return () => {
    return HttpResponse.json(
      {
        status,
        message,
        data: null,
      },
      { status },
    );
  };
};

// 빈 데이터 시뮬레이션
export const createEmptyHandler = (message: string = '데이터가 없습니다') => {
  return () => {
    return HttpResponse.json({
      status: 200,
      message,
      data: [],
    });
  };
};

/**
 * 스토리별 특수 시나리오 핸들러
 */
export const scenarioHandlers = {
  // 로딩 상태
  loading: [
    http.get(`${BASE_URL}/contents`, async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return HttpResponse.json({
        status: 200,
        message: '로딩 완료',
        data: [
          {
            contentId: 1,
            title: '이두나',
            posterImageUrl:
              'https://github.com/Jaeho-Site/mock-test-images/blob/main/k-drama-doona.webp?raw=true',
          },
        ],
      });
    }),
  ],

  // 에러 상태
  error: [
    http.get(`${BASE_URL}/contents`, createErrorHandler(500, 'API 서버에 연결할 수 없습니다')),
  ],

  // 빈 데이터
  empty: [http.get(`${BASE_URL}/contents`, createEmptyHandler('등록된 콘텐츠가 없습니다'))],

  // 네트워크 오류
  networkError: [
    http.get(`${BASE_URL}/contents`, () => {
      return HttpResponse.error();
    }),
  ],
};
