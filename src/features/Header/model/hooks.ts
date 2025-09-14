import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import type { NavKey } from './types';

export function useActiveNavKey(
  keyToPath: Record<NavKey, string>
): NavKey | undefined {
  const { pathname } = useLocation();

  return useMemo(() => {
    const entries = Object.entries(keyToPath).sort(
      (a, b) => b[1].length - a[1].length
    ) as Array<[NavKey, string]>;

    const match = entries.find(([, path]) => {
      if (path === '/') return pathname === '/';
      return pathname.startsWith(path);
    });

    return match?.[0];
  }, [keyToPath, pathname]);
}
