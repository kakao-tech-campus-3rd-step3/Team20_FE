# TanStack Router와 Storybook 통합 가이드 (첨부터 끝까지 AI가 쓴 파일입니다.)

이 가이드는 TanStack Router의 강력한 타입 안정성과 훅 기반 아키텍처를 Storybook과 통합하는 방법을 설명합니다.

## 🎯 핵심 전략

기존의 `react-router-dom`의 `MemoryRouter` 방식을 벗어나, **Decorator와 Parameters**를 활용하여 각 스토리에 필요한 라우팅 컨텍스트를 주입하는 현대적이고 유연한 방법을 사용합니다.

## 📁 파일 구조

```
.storybook/
├── preview.ts                    # 전역 Decorator 설정
├── tanstack-router-mock.tsx      # TanStack Router Mock Decorator
├── router-types.ts               # 라우터 타입 정의 및 프리셋
└── TANSTACK_ROUTER_GUIDE.md      # 이 가이드 문서
```

## 🚀 기본 사용법

### 1. 기본 라우터 설정 (전역)

모든 스토리는 기본적으로 홈 라우트(`/`)로 설정됩니다:

```typescript
// .storybook/preview.ts
export default {
  parameters: {
    router: {
      initialEntries: ['/'],
      initialIndex: 0,
    },
  },
  decorators: [withTanstackRouter],
} as Preview;
```

### 2. 개별 스토리에서 라우터 설정

각 스토리에서 `parameters.router`를 통해 라우터 설정을 커스터마이징할 수 있습니다:

```typescript
// MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MyComponent } from './MyComponent';
import { ROUTER_PRESETS } from '../../../.storybook/router-types';

const meta: Meta<typeof MyComponent> = {
  title: 'Features/MyComponent',
  component: MyComponent,
  parameters: {
    // 프리셋 사용
    router: ROUTER_PRESETS.CONTENT_DETAIL('squidgame'),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomRoute: Story = {
  parameters: {
    // 커스텀 라우터 설정
    router: {
      initialEntries: ['/content/123/map?tab=spots&view=list'],
      path: '/content/$contentId/map',
      params: { contentId: '123' },
      search: { tab: 'spots', view: 'list' },
    },
  },
};
```

## 🎛️ 라우터 설정 옵션

### RouterStoryConfig 타입

```typescript
interface RouterStoryConfig {
  initialEntries?: string[]; // 초기 라우트 경로 목록
  initialIndex?: number; // 초기 라우트 인덱스 (기본: 0)
  path?: string; // 현재 라우트 경로 패턴
  params?: Record<string, string>; // 라우트 파라미터
  search?: Record<string, string>; // 검색 파라미터 (쿼리 스트링)
  context?: Record<string, any>; // 라우터 컨텍스트
}
```

### 사용 예시

```typescript
// 1. 단순한 경로 설정
{
  router: {
    initialEntries: ['/map'],
  }
}

// 2. 파라미터가 있는 경로
{
  router: {
    initialEntries: ['/content/squidgame'],
    path: '/content/$id',
    params: { id: 'squidgame' },
  }
}

// 3. 쿼리 파라미터 포함
{
  router: {
    initialEntries: ['/content/123/map?tab=spots&view=list'],
    path: '/content/$contentId/map',
    params: { contentId: '123' },
    search: { tab: 'spots', view: 'list' },
  }
}
```

## 🎨 프리셋 활용

자주 사용하는 라우터 설정은 프리셋으로 제공됩니다:

```typescript
import { ROUTER_PRESETS } from '../../../.storybook/router-types';

// 사용 가능한 프리셋들
ROUTER_PRESETS.HOME; // 홈페이지 (/)
ROUTER_PRESETS.CONTENT_DETAIL('123'); // 콘텐츠 상세 (/content/123)
ROUTER_PRESETS.CONTENT_MAP('123'); // 콘텐츠 지도 (/content/123/map)
ROUTER_PRESETS.LOCATION_DETAIL('456'); // 장소 상세 (/location/456)
ROUTER_PRESETS.MAP; // 지도 페이지 (/map)
```

## 🔧 고급 사용법

### 1. 여러 라우트 히스토리

```typescript
{
  router: {
    initialEntries: ['/content/123', '/content/456', '/map'],
    initialIndex: 1, // /content/456에서 시작
  }
}
```

### 2. 라우터 컨텍스트 주입

```typescript
{
  router: {
    initialEntries: ['/content/123'],
    context: {
      user: { id: 'test-user' },
      theme: 'dark',
    },
  }
}
```

## 📝 실제 사용 예시

### SpotCard 컴포넌트 스토리

```typescript
// SpotCard.stories.tsx
export const WithContentRoute: Story = {
  name: '콘텐츠 상세 페이지에서',
  parameters: {
    router: ROUTER_PRESETS.CONTENT_DETAIL('squidgame'),
  },
  render: () => (
    <div className="max-w-md">
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          현재 라우트: <code>/content/squidgame</code>
        </p>
      </div>
      <SpotCard />
    </div>
  ),
};
```

## 🛠️ 디버깅 팁

### 1. 라우터 상태 확인

스토리에서 현재 라우터 상태를 확인하려면:

```typescript
import { useLocation, useParams } from '@tanstack/react-router';

function DebugInfo() {
  const location = useLocation();
  const params = useParams();

  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-4">
      <h4>라우터 디버그 정보</h4>
      <p>경로: {location.pathname}</p>
      <p>파라미터: {JSON.stringify(params)}</p>
      <p>검색: {JSON.stringify(location.search)}</p>
    </div>
  );
}
```

### 2. 링크 동작 확인

TanStack Router의 `Link` 컴포넌트가 올바르게 작동하는지 확인:

```typescript
export const LinkTest: Story = {
  render: () => (
    <div>
      <DebugInfo />
      <MyComponentWithLinks />
    </div>
  ),
};
```

## 🎯 모범 사례

### 1. 컴포넌트별 라우터 요구사항 문서화

```typescript
/**
 * MyComponent는 다음 라우터 설정이 필요합니다:
 * - path: '/content/$id'
 * - params: { id: string }
 */
const meta: Meta<typeof MyComponent> = {
  // ...
  parameters: {
    docs: {
      description: {
        component: '이 컴포넌트는 TanStack Router의 Link를 사용합니다.',
      },
    },
    router: ROUTER_PRESETS.CONTENT_DETAIL(),
  },
};
```

### 2. 재사용 가능한 프리셋 생성

```typescript
// 프로젝트별 커스텀 프리셋
export const CUSTOM_PRESETS = {
  CONTENT_WITH_SPOTS: (contentId: string) => ({
    initialEntries: [`/content/${contentId}/map?tab=spots`],
    path: '/content/$contentId/map',
    params: { contentId },
    search: { tab: 'spots' },
  }),
};
```

### 3. 스토리 그룹화

```typescript
// 라우터별로 스토리를 그룹화
export const OnHomePage: Story = {
  parameters: { router: ROUTER_PRESETS.HOME },
};

export const OnContentPage: Story = {
  parameters: { router: ROUTER_PRESETS.CONTENT_DETAIL() },
};

export const OnMapPage: Story = {
  parameters: { router: ROUTER_PRESETS.MAP },
};
```

## 🚨 주의사항

1. **타입 안정성**: TanStack Router의 타입 추론을 최대한 활용하세요.
2. **프리셋 우선**: 가능하면 프리셋을 사용하고, 필요시에만 커스텀 설정을 사용하세요.
3. **테스트 격리**: 각 스토리는 독립적인 라우터 인스턴스를 가지므로 서로 영향을 주지 않습니다.
4. **성능**: 복잡한 라우터 설정은 스토리 로딩 시간에 영향을 줄 수 있습니다.

## 🔄 마이그레이션 가이드

### react-router-dom에서 마이그레이션

**Before (react-router-dom):**

```typescript
decorators: [
  (Story) => (
    <MemoryRouter initialEntries={['/content/123']}>
      <Story />
    </MemoryRouter>
  ),
],
```

**After (TanStack Router):**

```typescript
parameters: {
  router: ROUTER_PRESETS.CONTENT_DETAIL('123'),
},
decorators: [withTanstackRouter],
```

이제 TanStack Router의 강력한 기능을 Storybook에서 완전히 활용할 수 있습니다! 🎉
