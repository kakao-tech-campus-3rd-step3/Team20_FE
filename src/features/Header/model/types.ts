import type { LucideIcon } from 'lucide-react';

export type NavKey = 'home' | 'map' | 'saved';

export type MenuItem = {
  key: NavKey;
  label: string;
  to: string;
  Icon: LucideIcon;
};

export type NavMenuProps = {
  active?: NavKey;
  onSelect?: (key: NavKey) => void;
};
