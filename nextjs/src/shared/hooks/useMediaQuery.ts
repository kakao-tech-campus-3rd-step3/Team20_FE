import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);

    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', onChange);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mql as any).addListener(onChange);
    }

    setMatches(mql.matches);

    return () => {
      if (typeof mql.removeEventListener === 'function') {
        mql.removeEventListener('change', onChange);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mql as any).removeListener(onChange);
      }
    };
  }, [query]);

  return matches;
}

export const useBreakpoints = () => {
  const isLaptop = useMediaQuery('(min-width: 1080px)');

  return {
    isLaptop,
  };
};