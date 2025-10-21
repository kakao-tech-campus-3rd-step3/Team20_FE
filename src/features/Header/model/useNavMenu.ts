//테스트용으로 만든 거라 삭제될 예정입니다.
import { useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/app/providers/useAuth';
import { MENU } from './utils';
import { navRouteMap } from './constants';
import type { NavKey, MenuItem } from './types';

export function useNavMenu(onSelect?: (key: NavKey) => void) {
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

  const handleNavClick = async (key: NavKey) => {
    if (key === 'auth' && isLoggedIn) {
      await logout();
    } else {
      const routeOptions = navRouteMap[key];
      navigate(routeOptions);
    }
    onSelect?.(key);
  };

  return {
    menuItems,
    handleNavClick,
  };
}
