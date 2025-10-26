import { Sparkles, MapPin } from 'lucide-react';
import type { MenuItem, NavKey, NavRouteMap } from './types';

// 각 NavKey에 대한 정확한 라우트 경로 매핑 (표시용)
export const keyToPath = {
  home: '/',
  map: '/map',
} as const satisfies Record<NavKey, string>;

// Next.js Link를 위한 타입 안전한 라우트 매핑
export const navRouteMap: NavRouteMap = {
  home: { href: '/' },
  map: { href: '/map' },
} as const;

// 타입 추출을 위한 타입 정의
export type KeyToPathType = typeof keyToPath;

export const MENU_BASE = [
  { key: 'home', href: '/', Icon: Sparkles },
  { key: 'map', href: '/map', Icon: MapPin },
] satisfies ReadonlyArray<Omit<MenuItem, 'label'>>;
