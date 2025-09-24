export const ROUTES = {
  HOME: '/' as const,
  CONTENT_DETAIL: '/content/$id' as const,
  MAP: '/map' as const,
  MAP_WITH_CONTENT: '/map/$contentId' as const,
} as const;

export const generatePath = {
  contentDetail: (id: string | number) => ({ to: '/content/$id', params: { id: String(id) } }),
  mapWithContent: (contentId: string | number) => ({
    to: '/map/$contentId',
    params: { contentId: String(contentId) },
  }),
} as const;
