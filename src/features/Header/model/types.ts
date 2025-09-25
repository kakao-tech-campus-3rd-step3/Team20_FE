import type { LucideIcon } from 'lucide-react';
import type { NavigateOptions, RegisteredRouter } from '@tanstack/react-router';

export type NavKey = 'home' | 'map';

export type MenuItem = {
  key: NavKey;
  label: string;
  to: string;
  Icon: LucideIcon;
};

export type RouterNavigateOptions = NavigateOptions<RegisteredRouter>;

export type NavRouteMap = {
  home: { to: '/' };
  map: { to: '/map' };
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
