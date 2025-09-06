import { Sparkles, MapPin, Heart } from 'lucide-react';
import type { MenuItem, NavKey } from '@/features/Header/model/types';

/* ----------------------------- 네비 데이터/매핑 ----------------------------- */
export const MENU: MenuItem[] = [
  { key: 'home', label: '홈', to: '/', Icon: Sparkles },
  { key: 'map', label: '지도', to: '/map', Icon: MapPin },
  { key: 'saved', label: '저장됨', to: '/saved', Icon: Heart },
];

export const keyToPath: Record<NavKey, string> = {
  home: '/',
  map: '/map',
  saved: '/saved',
};

export function pathToKey(p: string): NavKey {
  if (p.startsWith('/map')) return 'map';
  if (p.startsWith('/saved')) return 'saved';
  return 'home';
}
