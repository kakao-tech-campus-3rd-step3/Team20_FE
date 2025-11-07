import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock API 시나리오
export const API_SCENARIOS = {
  default: 'default',
  loading: 'loading',
  error: 'error',
};

// 간단한 API 데코레이터
export const WithApi = (Story, context) => {
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  }));

  useEffect(() => {
    // API 모킹 설정
    const scenario = context.globals?.api || API_SCENARIOS.default;
    console.log(`API Scenario: ${scenario}`);
  }, [context.globals?.api]);

  return (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  );
};
