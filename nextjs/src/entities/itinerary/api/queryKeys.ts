export const itineraryKeys = {
  all: ['itineraries'] as const,
  lists: () => [...itineraryKeys.all, 'list'] as const,
  detail: (id: string) => [...itineraryKeys.all, 'detail', id] as const,
} as const;