export const locationReviewQueryKeys = {
  all: ['location-review'] as const,
  byLocation: (id: string | number) => [...locationReviewQueryKeys.all, 'byLocation', id] as const,
} as const;
