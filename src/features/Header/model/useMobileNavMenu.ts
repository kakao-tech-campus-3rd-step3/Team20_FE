//테스트용으로 만든거라 삭제될 예정입니다.
import { useMemo } from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/shared/lib/auth';
import { useNavigate } from '@tanstack/react-router';
import { MENU } from './utils';
import { navRouteMap } from './constants';
import type { NavKey, MenuItem } from './types';

export function useMobileNavMenu(onSelect?: (key: NavKey) => void, onClose?: () => void) {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const menuItems = useMemo(() => {
    return MENU.map((item) => {
      if (item.key === 'auth') {
        return {
          ...item,
          label: isLoggedIn ? '로그아웃' : '로그인',
          Icon: isLoggedIn ? LogOut : item.Icon,
        };
      }
      return item;
    }) as ReadonlyArray<MenuItem>;
  }, [isLoggedIn]);

  const handleItemClick = async (key: NavKey) => {
    if (key === 'auth' && isLoggedIn) {
      await logout();
    } else {
      const routeOptions = navRouteMap[key];
      navigate(routeOptions);
    }
    onSelect?.(key);
    onClose?.();
  };

  return {
    menuItems,
    handleItemClick,
  };
}
