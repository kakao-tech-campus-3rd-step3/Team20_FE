import type { MenuItem, NavKey } from './types';
import { MENU_BASE } from './constants';
import { NAV_LABELS } from './messages';
import { resolveActiveKey } from './hooks';

export function pathToKey(p: string): NavKey {
  return resolveActiveKey(p) ?? 'home';
}

export function buildMenu(labels = NAV_LABELS): ReadonlyArray<MenuItem> {
  return MENU_BASE.map((item) => ({
    ...item,
    label: labels[item.key],
  }));
}

export const MENU: ReadonlyArray<MenuItem> = buildMenu();
