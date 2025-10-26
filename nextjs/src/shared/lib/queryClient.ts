import { QueryClient } from '@tanstack/react-query';

let client: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (typeof window === 'undefined') {
    // 서버: 새로운 QueryClient 생성
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5,
          gcTime: 1000 * 60 * 30,
          retry: 2,
        },
      },
    });
  }
  // 브라우저: 기존 클라이언트 재사용 또는 새로 생성
  if (!client) {
    client = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5,
          gcTime: 1000 * 60 * 30,
          retry: 2,
        },
      },
    });
  }
  return client;
}

export const queryClient = getQueryClient();
