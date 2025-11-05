import type { LucideIcon } from 'lucide-react';

export type NavKey = 'home' | 'map' | 'itinerary';

export type MenuItem = {
  key: NavKey;
  label: string;
  href: string;
  Icon: LucideIcon;
};

export type NavRouteMap = {
  home: { href: '/' };
  map: { href: '/map' };
  itinerary: { href: '/itinerary' };
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
