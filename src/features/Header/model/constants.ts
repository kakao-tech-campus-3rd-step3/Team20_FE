import { Sparkles, MapPin, LogIn } from 'lucide-react';
import type { MenuItem, NavKey, NavRouteMap } from './types';

// 각 NavKey에 대한 정확한 라우트 경로 매핑 (표시용)
export const keyToPath = {
  home: '/',
  map: '/map',
  auth: '/auth/login',
} as const satisfies Record<NavKey, string>;

// TanStack Router 네비게이션을 위한 타입 안전한 라우트 매핑
export const navRouteMap: NavRouteMap = {
  home: { to: '/' },
  map: { to: '/map' },
  auth: { to: '/auth/login' },
} as const;

// 타입 추출을 위한 타입 정의
export type KeyToPathType = typeof keyToPath;

export const MENU_BASE = [
  { key: 'home', to: '/', Icon: Sparkles },
  { key: 'map', to: '/map', Icon: MapPin },
  { key: 'auth', to: '/auth/login', Icon: LogIn },
] satisfies ReadonlyArray<Omit<MenuItem, 'label'>>;
