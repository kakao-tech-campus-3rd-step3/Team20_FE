import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    // 초기 깜빡임 완화: SSR이 아닌 경우 즉시 현재 상태 반영
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);

    // 최신 브라우저 우선 (addEventListener가 함수인지 확인)
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', onChange);
    } else {
      // 레거시 폴백 (구형 Safari/Edge)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mql as any).addListener(onChange);
    }

    // 현재값 동기화 (의존 쿼리 변경 시)
    setMatches(mql.matches);

    return () => {
      if (typeof mql.removeEventListener === 'function') {
        mql.removeEventListener('change', onChange);
      } else {
        // 레거시 폴백 (구형 Safari/Edge)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mql as any).removeListener(onChange);
      }
    };
  }, [query]);

  return matches;
}

/**
 * 2개 화면 구분을 위한 브레이크포인트 훅
 * - 모바일/태블릿: 1080px 미만
 * - 노트북: 1080px 이상
 */
export const useBreakpoints = () => {
  const isMobileOrTablet = useMediaQuery('(max-width: 1079px)');
  const isLaptop = useMediaQuery('(min-width: 1080px)');

  return {
    isMobileOrTablet,
    isLaptop,
  };
};
