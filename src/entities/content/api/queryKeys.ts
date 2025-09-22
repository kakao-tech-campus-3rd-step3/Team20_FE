// useSuspenseQuery를 사용할 때 사용하는 쿼리 키 : 무조건 as const 타입으로 export 해주세요!

export const contentQueryKeys = {
  all: ['content'] as const,
  detail: (contentId: string | number) =>
    [...contentQueryKeys.all, 'detail', String(contentId)] as const,
  popular: () => [...contentQueryKeys.all, 'popular'] as const,
  locations: (contentId: string | number) =>
    [...contentQueryKeys.all, 'locations', String(contentId)] as const,
} as const;
