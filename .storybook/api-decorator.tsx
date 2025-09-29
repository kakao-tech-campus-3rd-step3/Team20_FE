import type { Decorator } from '@storybook/react';
import React, { useEffect, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { worker, mswHelpers } from './msw-setup';
import { scenarioHandlers } from './msw-handlers';

interface ApiStoryParameters {
  api?: {
    /**
     * MSW 시나리오 선택
     * @default 'default'
     */
    scenario?: 'default' | 'loading' | 'error' | 'empty' | 'networkError';

    customHandlers?: any[];

    queryClient?: {
      defaultOptions?: {
        queries?: any;
        mutations?: any;
      };
    };

    showDevtools?: boolean;
    delay?: number;
  };
}

export const withApi: Decorator = (Story, context) => {
  const parameters: ApiStoryParameters = context.parameters;
  const apiConfig = parameters.api || {};

  const {
    scenario = 'default',
    customHandlers = [],
    queryClient: queryClientConfig = {},
    showDevtools = false,
    delay = 0,
  } = apiConfig;

  // QueryClient 생성 (스토리별로 독립적)
  const queryClient = useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          retry: false, // 스토리북에서는 재시도 비활성화
          staleTime: Infinity, // 무한 캐시로 리페치 방지
          gcTime: 1000 * 60 * 10,
          refetchOnWindowFocus: false,
          refetchOnMount: false, // 마운트 시 리페치 방지
          refetchOnReconnect: false, // 재연결 시 리페치 방지
          ...queryClientConfig.defaultOptions?.queries,
        },
        mutations: {
          retry: false,
          ...queryClientConfig.defaultOptions?.mutations,
        },
      },
    });
  }, []);

  // MSW 핸들러 설정
  useEffect(() => {
    console.log(`🎭 MSW 시나리오 설정: ${scenario}`);

    // 기본 핸들러 리셋
    mswHelpers.resetHandlers();

    // 시나리오별 핸들러 적용
    if (scenario !== 'default' && scenarioHandlers[scenario]) {
      console.log(`📝 시나리오 핸들러 적용: ${scenario}`);
      mswHelpers.addHandlers(scenarioHandlers[scenario]);
    }

    // 커스텀 핸들러 적용
    if (customHandlers.length > 0) {
      console.log(`🎨 커스텀 핸들러 ${customHandlers.length}개 적용`);
      mswHelpers.addHandlers(customHandlers);
    }

    // 활성 핸들러 수 확인
    console.log(`🔧 현재 활성 핸들러: ${worker.listHandlers().length}개`);

    // 지연 시간 적용 (개발용)
    if (delay > 0) {
      console.log(`🕐 API 응답 지연: ${delay}ms`);
    }

    // 정리 함수
    return () => {
      mswHelpers.resetHandlers();
    };
  }, [scenario, customHandlers, delay]);

  // API Wrapper 컴포넌트
  const ApiWrapper = () => (
    <QueryClientProvider client={queryClient}>
      <div data-testid="storybook-api-wrapper">
        <Story />
      </div>
      {showDevtools && <ReactQueryDevtools initialIsOpen={false} position="bottom" />}
    </QueryClientProvider>
  );

  return <ApiWrapper />;
};

interface ApiDebugInfoProps {
  scenario?: string;
  showHandlers?: boolean;
}

export const ApiDebugInfo: React.FC<ApiDebugInfoProps> = ({
  scenario = 'default',
  showHandlers = false,
}) => {
  const handlersCount = worker.listHandlers().length;

  return (
    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold text-blue-800">🎭 MSW 상태</h4>
        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">{scenario}</span>
      </div>

      <div className="text-xs text-blue-600 space-y-1">
        <p>활성 핸들러: {handlersCount}개</p>
        <p>MSW 상태: {mswHelpers.getStatus()}</p>

        {showHandlers && (
          <details className="mt-2">
            <summary className="cursor-pointer text-blue-700 hover:text-blue-800">
              핸들러 목록 보기
            </summary>
            <div className="mt-1 pl-2 border-l-2 border-blue-200">
              {worker.listHandlers().map((handler, index) => (
                <div key={index} className="text-xs text-gray-600">
                  핸들러 #{index + 1}
                </div>
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  );
};

export const API_SCENARIOS = {
  DEFAULT: { scenario: 'default' as const },
  LOADING: { scenario: 'loading' as const, showDevtools: true },
  ERROR: { scenario: 'error' as const },
  EMPTY: { scenario: 'empty' as const },
  NETWORK_ERROR: { scenario: 'networkError' as const },
  WITH_DEVTOOLS: { scenario: 'default' as const, showDevtools: true },
  SLOW_RESPONSE: { scenario: 'default' as const, delay: 2000 },
} as const;

declare module '@storybook/react' {
  interface Parameters {
    api?: ApiStoryParameters['api'];
  }
}
