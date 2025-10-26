'use client';

import { useRouter } from 'next/navigation';
import { MENU } from './utils';
import { navRouteMap } from './constants';
import type { NavKey } from './types';

export function useNavMenu(onSelect?: (key: NavKey) => void) {
  const router = useRouter();

  const handleNavClick = (key: NavKey) => {
    const routeOptions = navRouteMap[key];
    router.push(routeOptions.href);
    onSelect?.(key);
  };

  return {
    menuItems: MENU,
    handleNavClick,
  };
}