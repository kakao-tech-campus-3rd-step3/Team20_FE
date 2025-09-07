import type { MenuItem, NavKey } from './types';
import { MENU_BASE, keyToPath } from './constants';
import { NAV_LABELS } from './messages';

export function pathToKey(p: string): NavKey {
  if (p.startsWith(keyToPath.map)) return 'map';
  if (p.startsWith(keyToPath.saved)) return 'saved';
  return 'home';
}

export function buildMenu(labels = NAV_LABELS): ReadonlyArray<MenuItem> {
  return MENU_BASE.map((item) => ({
    ...item,
    label: labels[item.key],
  }));
}

export const MENU: ReadonlyArray<MenuItem> = buildMenu();
