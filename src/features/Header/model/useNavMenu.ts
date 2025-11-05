import { useNavigate } from '@tanstack/react-router';
import { MENU } from './utils';
import { navRouteMap } from './constants';
import type { NavKey } from './types';

export function useNavMenu(onSelect?: (key: NavKey) => void, onClose?: () => void) {
  const navigate = useNavigate();

  const handleNavClick = (key: NavKey) => {
    const routeOptions = navRouteMap[key];
    navigate(routeOptions);
    onSelect?.(key);
    onClose?.();
  };

  return {
    menuItems: MENU,
    handleNavClick,
  };
}
