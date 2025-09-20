import { Sparkles, MapPin, Heart } from 'lucide-react';
import type { MenuItem, NavKey } from './types';
import { ROUTES } from '@/shared/config/routes';

export const keyToPath: Record<NavKey, string> = {
  home: ROUTES.HOME,
  map: ROUTES.MAP,
  content: ROUTES.CONTENT_DETAIL,
};

export const MENU_BASE = [
  { key: 'home', to: ROUTES.HOME, Icon: Sparkles },
  { key: 'map', to: ROUTES.MAP, Icon: MapPin },
  { key: 'content', to: ROUTES.CONTENT_DETAIL, Icon: Heart },
] satisfies ReadonlyArray<Omit<MenuItem, 'label'>>;
