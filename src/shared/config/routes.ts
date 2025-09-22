export const ROUTES = {
  HOME: '/',
  CONTENT_DETAIL: '/content',
  MAP: '/map',
  MAP_WITH_CONTENT: '/map/:contentId',
} as const;

//   TODO: 추후 사용 예정
// export const ROUTES = {
//  HOME: '/',
//  CONTENT_DETAIL: '/content/:id',
//  MAP: '/map/:id',
// } as const;

//   export const generatePath = {
//     contentDetail: (id: string | number) => `/content/${id}`,
//     mapWithContent: (contentId?: string | number) =>
//       contentId ? `/map?contentId=${contentId}` : '/map',
//   } as const;
