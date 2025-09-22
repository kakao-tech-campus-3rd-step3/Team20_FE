export const contentQueryKeys = {
  all: ['content'] as const,
  detail: (id: string | number) => [...contentQueryKeys.all, 'detail', id] as const,
  popular: () => [...contentQueryKeys.all, 'popular'] as const,
  category: (category: string) => [...contentQueryKeys.all, 'category', category] as const,
} as const;

//Todo querykey factory 방식으로 위처럼 사용하도록 바꾸기 
export const popularContentKeys = contentQueryKeys;
export const contentDetailKeys = contentQueryKeys;
export const categoryContentKeys = contentQueryKeys;