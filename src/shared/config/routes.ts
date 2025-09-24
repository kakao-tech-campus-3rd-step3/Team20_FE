// TanStack Router는 타입 안전한 네비게이션을 제공하므로
// 라우트 경로는 컴파일 타임에 체크됩니다.
export const ROUTES = {
  HOME: '/' as const,
  CONTENT_DETAIL: '/content/$id' as const,
  MAP: '/map' as const,
  MAP_WITH_CONTENT: '/map/$contentId' as const,
} as const;

// TanStack Router에서는 타입 안전한 네비게이션을 위해
// router.navigate() 메서드를 사용합니다.
// 예: router.navigate({ to: '/content/$id', params: { id: '123' } })
export const generatePath = {
  contentDetail: (id: string | number) => ({ to: '/content/$id', params: { id: String(id) } }),
  mapWithContent: (contentId: string | number) => ({
    to: '/map/$contentId',
    params: { contentId: String(contentId) },
  }),
} as const;
