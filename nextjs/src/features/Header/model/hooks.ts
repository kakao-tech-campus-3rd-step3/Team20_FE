import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import type { NavKey } from './types';
import { keyToPath } from './constants';

function toBasePath(p: string) {
  const cut = p.replace(/\/:.*$/, '');
  const trimmed = cut !== '/' ? cut.replace(/\/+$/, '') : cut;
  return trimmed;
}

const BASE_ENTRIES: ReadonlyArray<readonly [NavKey, string]> = (
  Object.entries(keyToPath) as Array<[NavKey, string]>
)
  .map(([k, p]) => [k, toBasePath(p)] as const)
  .sort((a, b) => b[1].length - a[1].length);

export function resolveActiveKey(pathname: string): NavKey | undefined {
  const match = BASE_ENTRIES.find(([, base]) => {
    if (base === '/') return pathname === '/';
    return pathname === base || pathname.startsWith(base + '/');
  });
  return match?.[0];
}

export function useActiveNavKey(): NavKey | undefined {
  const pathname = usePathname();
  return useMemo(() => resolveActiveKey(pathname), [pathname]);
}

export function useResolvedActiveKey(controlledActive?: NavKey) {
  const autoActive = useActiveNavKey();
  return controlledActive ?? autoActive;
}

export function useNavActions(onSelect?: (key: NavKey) => void, onAfterNavigate?: () => void) {
  const onItemClick = (key: NavKey) => {
    onSelect?.(key);
    onAfterNavigate?.();
  };

  return { onItemClick };
}
