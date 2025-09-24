import { Sparkles, MapPin, Heart } from 'lucide-react';
import type { MenuItem, NavKey, NavRouteMap } from './types';
import { ROUTES } from '@/shared/config/routes';

// 각 NavKey에 대한 정확한 라우트 경로 매핑 (표시용)
export const keyToPath = {
  home: ROUTES.HOME,
  map: ROUTES.MAP,
} as const satisfies Record<NavKey, string>;

// TanStack Router 네비게이션을 위한 타입 안전한 라우트 매핑
export const navRouteMap: NavRouteMap = {
  home: { to: '/' },
  map: { to: '/map' },
} as const;

// 타입 추출을 위한 타입 정의
export type KeyToPathType = typeof keyToPath;

export const MENU_BASE = [
  { key: 'home', to: ROUTES.HOME, Icon: Sparkles },
  { key: 'map', to: ROUTES.MAP, Icon: MapPin },
  { key: 'home', to: ROUTES.HOME, Icon: Heart },
] satisfies ReadonlyArray<Omit<MenuItem, 'label'>>;
