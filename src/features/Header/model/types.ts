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

export interface MobileNavMenuProps extends NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface HamburgerMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  'aria-label'?: string;
}
