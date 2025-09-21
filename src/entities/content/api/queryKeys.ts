// useSuspenseQuery를 사용할 때 사용하는 쿼리 키 : 무조건 as const 타입으로 export 해주세요!
export const popularContentKeys = {
  popular: ['popularContents'] as const,
};

export const contentDetailKeys = {
  base: ['detailContents'] as const,
  detail: (contentId: string) => [...contentDetailKeys.base, contentId] as const,
};

export const categoryContentKeys = {
  base: ['categoryContents'] as const,
  category: (category: string) => [...categoryContentKeys.base, category] as const,
};
