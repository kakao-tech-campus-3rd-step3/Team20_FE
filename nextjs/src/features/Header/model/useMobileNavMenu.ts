import { useRouter } from 'next/navigation';
import { MENU } from './utils';
import { navRouteMap } from './constants';
import type { NavKey } from './types';

export function useMobileNavMenu(onSelect?: (key: NavKey) => void, onClose?: () => void) {
  const router = useRouter();

  const handleItemClick = (key: NavKey) => {
    const route = navRouteMap[key];
    // Next.js의 router.push는 문자열 경로만 받으므로 href 속성 사용
    router.push(route.href);
    onSelect?.(key);
    onClose?.();
  };

  return {
    menuItems: MENU,
    handleItemClick,
  };
}
