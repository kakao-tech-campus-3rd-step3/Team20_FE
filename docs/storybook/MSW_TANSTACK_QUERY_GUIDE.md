# MSW + TanStack Query와 Storybook을 결합하기 (첨부터 끝까지 AI가 쓴 파일입니다.)

이 가이드는 MSW(Mock Service Worker)와 TanStack Query를 Storybook과 통합하여 **완벽한 API 모킹 환경**을 구축하는 방법을 설명합니다.

## 🎯 핵심 목표

- **실제와 동일한 API 환경**: 실제 백엔드 없이도 완전한 API 통신 시뮬레이션
- **다양한 상태 테스트**: 로딩, 성공, 오류, 빈 데이터 등 모든 시나리오 커버
- **개발자 경험 향상**: React Query Devtools와 MSW 디버깅 도구 통합
- **타입 안전성**: TypeScript와 함께 완벽한 타입 추론

## 📁 아키텍처 구조

```
.storybook/
├── msw-handlers.ts              # MSW API 핸들러 정의
├── msw-setup.ts                 # MSW 초기화 및 설정
├── api-decorator.tsx            # TanStack Query + MSW Decorator
├── preview.ts                   # 전역 설정
├── example-components/          # 예제 컴포넌트들
│   ├── ContentList.tsx
│   └── ContentList.stories.tsx
└── MSW_TANSTACK_QUERY_GUIDE.md # 이 가이드
```

## 🚀 기본 사용법

### 1. 스토리에서 API 시나리오 설정

```typescript
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MyComponent } from './MyComponent';
import { API_SCENARIOS } from '../.storybook/api-decorator';

const meta: Meta<typeof MyComponent> = {
  title: 'Features/MyComponent',
  component: MyComponent,
  parameters: {
    api: API_SCENARIOS.DEFAULT, // 기본 API 상태
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 다양한 API 상태 시나리오
export const Default: Story = {};

export const Loading: Story = {
  parameters: {
    api: API_SCENARIOS.LOADING, // 로딩 상태
  },
};

export const Error: Story = {
  parameters: {
    api: API_SCENARIOS.ERROR, // 에러 상태
  },
};
```

### 2. 커스텀 API 응답 정의

```typescript
import { http, HttpResponse } from 'msw';

export const CustomApiResponse: Story = {
  parameters: {
    api: {
      scenario: 'default',
      customHandlers: [
        http.get('/api/custom-endpoint', () => {
          return HttpResponse.json({
            status: 200,
            data: { message: '커스텀 응답!' },
          });
        }),
      ],
      showDevtools: true, // React Query Devtools 표시
    },
  },
};
```

## 🎛️ API 시나리오 종류

### 사전 정의된 시나리오

```typescript
export const API_SCENARIOS = {
  DEFAULT: { scenario: 'default' }, // ✅ 정상 응답
  LOADING: { scenario: 'loading' }, // ⏳ 로딩 상태 (3초 지연)
  ERROR: { scenario: 'error' }, // ❌ 서버 오류 (500)
  EMPTY: { scenario: 'empty' }, // 📭 빈 데이터
  NETWORK_ERROR: { scenario: 'networkError' }, // 🌐 네트워크 오류
  WITH_DEVTOOLS: { showDevtools: true }, // 🔧 Devtools 포함
  SLOW_RESPONSE: { delay: 2000 }, // 🐌 느린 응답 (2초)
};
```

### 커스텀 시나리오 생성

```typescript
export const MyCustomScenario: Story = {
  parameters: {
    api: {
      scenario: 'default',
      customHandlers: [
        // 특정 사용자 데이터
        http.get('/api/user/123', () => {
          return HttpResponse.json({
            id: 123,
            name: '스토리북 사용자',
            avatar: 'https://example.com/avatar.jpg',
          });
        }),

        // 점진적 로딩 시뮬레이션
        http.get('/api/posts', async () => {
          await new Promise((resolve) => setTimeout(resolve, 1500));
          return HttpResponse.json([
            { id: 1, title: '첫 번째 포스트' },
            { id: 2, title: '두 번째 포스트' },
          ]);
        }),

        // 조건부 응답
        http.get('/api/products', ({ request }) => {
          const url = new URL(request.url);
          const category = url.searchParams.get('category');

          if (category === 'electronics') {
            return HttpResponse.json([
              { id: 1, name: '노트북', category: 'electronics' },
              { id: 2, name: '스마트폰', category: 'electronics' },
            ]);
          }

          return HttpResponse.json([]);
        }),
      ],
      queryClient: {
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60, // 1분
            gcTime: 1000 * 60 * 5, // 5분
          },
        },
      },
    },
  },
};
```

## 🛠️ 고급 활용법

### 1. 동적 API 응답

```typescript
// 요청 파라미터에 따른 동적 응답
http.get('/api/contents/:id', ({ params }) => {
  const { id } = params;

  return HttpResponse.json({
    id: Number(id),
    title: `콘텐츠 ${id}`,
    description: `ID ${id}번 콘텐츠입니다`,
  });
});

// 쿼리 파라미터 활용
http.get('/api/search', ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('q');
  const page = url.searchParams.get('page') || '1';

  return HttpResponse.json({
    query,
    page: Number(page),
    results: [`${query} 검색결과 ${page}페이지`],
  });
});
```

### 2. 상태 관리와 연동

```typescript
// 상태별 다른 응답
let userLoggedIn = false;

const authHandlers = [
  http.post('/api/login', async ({ request }) => {
    const body = await request.json();

    if (body.username === 'admin' && body.password === 'password') {
      userLoggedIn = true;
      return HttpResponse.json({ token: 'fake-jwt-token' });
    }

    return HttpResponse.json({ error: '로그인 실패' }, { status: 401 });
  }),

  http.get('/api/profile', () => {
    if (!userLoggedIn) {
      return HttpResponse.json({ error: '인증 필요' }, { status: 401 });
    }

    return HttpResponse.json({
      id: 1,
      username: 'admin',
      role: 'administrator',
    });
  }),
];
```

### 3. 에러 시나리오 테스트

```typescript
// 다양한 HTTP 상태 코드
const errorScenarios = {
  badRequest: http.get('/api/data', () =>
    HttpResponse.json({ error: '잘못된 요청' }, { status: 400 }),
  ),

  unauthorized: http.get('/api/data', () =>
    HttpResponse.json({ error: '인증 필요' }, { status: 401 }),
  ),

  forbidden: http.get('/api/data', () =>
    HttpResponse.json({ error: '권한 없음' }, { status: 403 }),
  ),

  notFound: http.get('/api/data', () =>
    HttpResponse.json({ error: '리소스 없음' }, { status: 404 }),
  ),

  serverError: http.get('/api/data', () =>
    HttpResponse.json({ error: '서버 오류' }, { status: 500 }),
  ),

  networkError: http.get('/api/data', () => HttpResponse.error()),
};
```

## 🎨 실제 사용 예제

### ContentList 컴포넌트 스토리

```typescript
export const ContentListStory: Story = {
  render: () => (
    <div>
      <ApiDebugInfo scenario="default" showHandlers />
      <ContentList />
    </div>
  ),
  parameters: {
    api: {
      scenario: 'default',
      showDevtools: true,
    },
  },
};

// 로딩 상태 테스트
export const LoadingState: Story = {
  parameters: {
    api: {
      scenario: 'loading',
      customHandlers: [
        http.get('/api/contents', async () => {
          await new Promise(resolve => setTimeout(resolve, 3000));
          return HttpResponse.json({ data: [] });
        }),
      ],
    },
  },
};
```

## 🔧 디버깅 도구

### 1. ApiDebugInfo 컴포넌트

```typescript
import { ApiDebugInfo } from '../.storybook/api-decorator';

export const WithDebugInfo: Story = {
  render: () => (
    <div>
      <ApiDebugInfo
        scenario="loading"
        showHandlers={true}
      />
      <MyComponent />
    </div>
  ),
};
```

### 2. React Query Devtools

```typescript
// Devtools 활성화
parameters: {
  api: {
    showDevtools: true,
  },
}
```

### 3. MSW 핸들러 상태 확인

```typescript
// 브라우저 콘솔에서
console.log('활성 핸들러:', worker.listHandlers().length);
console.log('MSW 상태:', mswHelpers.getStatus());
```

## 📊 성능 최적화

### 1. 쿼리 캐싱 전략

```typescript
parameters: {
  api: {
    queryClient: {
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5, // 5분간 fresh
          gcTime: 1000 * 60 * 30,   // 30분간 캐시 보관
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
        },
      },
    },
  },
}
```

### 2. 메모리 관리

```typescript
// 스토리 전환 시 자동으로 QueryClient 정리
// withApi Decorator에서 자동 처리됨

// 수동 정리가 필요한 경우
useEffect(() => {
  return () => {
    queryClient.clear(); // 모든 쿼리 캐시 정리
  };
}, []);
```

## 🎭 실제 프로젝트 적용 팁

### 1. API 응답 타입 정의

```typescript
// types/api.ts
export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface Content {
  contentId: number;
  title: string;
  posterImageUrl: string;
  category: 'DRAMA' | 'MOVIE' | 'POP';
}

// MSW 핸들러에서 타입 활용
http.get('/api/contents', (): Response => {
  const response: ApiResponse<Content[]> = {
    status: 200,
    message: '성공',
    data: [
      /* ... */
    ],
  };
  return HttpResponse.json(response);
});
```

### 2. 환경별 설정

```typescript
// .storybook/preview.ts
const isDevelopment = process.env.NODE_ENV === 'development';

const preview: Preview = {
  parameters: {
    api: {
      scenario: 'default',
      showDevtools: isDevelopment, // 개발 환경에서만 Devtools 표시
    },
  },
};
```

### 3. 실제 API와의 전환

```typescript
// 환경 변수로 실제 API 사용 여부 결정
const useRealApi = process.env.STORYBOOK_USE_REAL_API === 'true';

if (!useRealApi) {
  initializeMsw(); // MSW 사용
}
```

## 🚨 주의사항 및 모범 사례

### ✅ 좋은 사례

1. **일관된 응답 형식**: 실제 API와 동일한 응답 구조 사용
2. **타입 안전성**: TypeScript 인터페이스로 응답 타입 정의
3. **시나리오 분리**: 각 상태별로 명확히 구분된 스토리 작성
4. **디버깅 정보**: ApiDebugInfo 컴포넌트로 상태 시각화

### ❌ 피해야 할 사례

1. **과도한 지연**: 불필요하게 긴 로딩 시간 설정
2. **타입 불일치**: 실제 API와 다른 응답 구조
3. **메모리 누수**: QueryClient 정리 누락
4. **핸들러 충돌**: 동일 엔드포인트의 중복 핸들러

## 🎉 결론

이제 여러분은 MSW + TanStack Query + Storybook의 완벽한 통합 환경을 구축했습니다!

### 🎁 얻은 것들

- **완벽한 API 모킹**: 실제 백엔드 없이도 모든 API 시나리오 테스트
- **개발 효율성**: 빠른 프로토타이핑과 컴포넌트 개발
- **품질 향상**: 다양한 엣지 케이스 사전 테스트
- **팀 협업**: 백엔드 개발과 독립적인 프론트엔드 개발

### 🚀 다음 단계

1. 실제 프로젝트 컴포넌트에 적용
2. 팀원들과 API 시나리오 공유
3. CI/CD 파이프라인에 Storybook 테스트 통합
4. 실제 API 연동 시 MSW 핸들러를 참조 문서로 활용

---

_"좋은 도구는 개발자를 자유롭게 한다. MSW + TanStack Query로 API의 모든 가능성을 탐험하세요!"_ 🎭✨
