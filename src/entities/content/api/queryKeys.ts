export const contentQueryKeys = {
  all: ['content'] as const,
  detail: (id: string | number) => [...contentQueryKeys.all, 'detail', id] as const,
  details: (ids: (string | number)[]) => [...contentQueryKeys.all, 'details', ids] as const,
  popular: () => [...contentQueryKeys.all, 'popular'] as const,
  category: (category: string) => [...contentQueryKeys.all, 'category', category] as const,
  locations: (id: string | number) => [...contentQueryKeys.all, 'locations', id] as const,
} as const;
