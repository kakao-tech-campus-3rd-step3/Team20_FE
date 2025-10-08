//테스트용으로 만든 거라 삭제될 예정입니다.
import { useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/app/providers/AuthProvider';
import { MENU } from './utils';
import { navRouteMap } from './constants';
import type { NavKey, MenuItem } from './types';

export function useNavMenu(onSelect?: (key: NavKey) => void) {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const menuItems = useMemo(() => {
    return MENU.map((item) => {
      if (item.key === 'auth') {
        return {
          ...item,
          label: isAuthenticated ? '로그아웃' : '로그인',
          Icon: isAuthenticated ? LogOut : item.Icon,
        };
      }
      return item;
    }) as ReadonlyArray<MenuItem>;
  }, [isAuthenticated]);

  const handleNavClick = (key: NavKey) => {
    if (key === 'auth' && isAuthenticated) {
      logout();
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
