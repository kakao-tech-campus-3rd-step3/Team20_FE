import { Home, User, Route } from 'lucide-react';
import type { FooterLink, NavLink } from './types';
import { LABELS } from './messages';

export const FOOTER_QUICK_LINKS: readonly NavLink[] = [
  { label: LABELS.NAV.HOME, href: '/', Icon: Home },
  { label: LABELS.NAV.AI_ITINERARY, href: '/itinerary', Icon: Route },
  { label: LABELS.NAV.PROFILE, href: '/profile', Icon: User },
];

export const FOOTER_CATEGORIES: readonly Omit<NavLink, 'Icon'>[] = [
  { label: LABELS.CATEGORY.DRAMA, href: '/#drama' },
  { label: LABELS.CATEGORY.MOVIE, href: '/#movie' },
  { label: LABELS.CATEGORY.KPOP, href: '/#kpop' },
];

export const POLICY_LINKS: readonly FooterLink[] = [
  { label: LABELS.POLICY.PRIVACY, href: '/privacy' },
  { label: LABELS.POLICY.TERMS, href: '/terms' },
];