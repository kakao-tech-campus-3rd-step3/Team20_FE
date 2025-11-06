import { Sparkles, MapPin } from 'lucide-react';
import type { MenuItem, NavKey, NavRouteMap } from './types';

export const keyToPath = {
  home: '/',
  map: '/map',
} as const satisfies Record<NavKey, string>;

export const navRouteMap: NavRouteMap = {
  home: { to: '/' },
  map: { to: '/map' },
} as const;

export type KeyToPathType = typeof keyToPath;

export const MENU_BASE = [
  { key: 'home', to: '/', Icon: Sparkles },
  { key: 'map', to: '/map', Icon: MapPin },
] satisfies ReadonlyArray<Omit<MenuItem, 'label'>>;
