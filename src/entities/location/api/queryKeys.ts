export const locationQueryKeys = {
  all: ['location'] as const,
  detail: (id: string | number) => [...locationQueryKeys.all, 'detail', id] as const,
} as const;
