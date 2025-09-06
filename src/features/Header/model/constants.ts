import { Sparkles, MapPin, Heart } from 'lucide-react';
import type { MenuItem, NavKey } from './types';

export const keyToPath: Record<NavKey, string> = {
  home: '/',
  map: '/map',
  saved: '/saved',
};

export const MENU_BASE = [
  { key: 'home', to: keyToPath.home, Icon: Sparkles },
  { key: 'map', to: keyToPath.map, Icon: MapPin },
  { key: 'saved', to: keyToPath.saved, Icon: Heart },
] satisfies ReadonlyArray<Omit<MenuItem, 'label'>>;
