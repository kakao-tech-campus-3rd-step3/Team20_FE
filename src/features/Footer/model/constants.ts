import { Home, MapPin, User } from 'lucide-react';
import type { FooterLink, NavLink } from './types';
import { LABELS } from './messages';

export const FOOTER_QUICK_LINKS: readonly NavLink[] = [
  { label: LABELS.NAV.HOME, to: '/', Icon: Home },
  { label: LABELS.NAV.MAP, to: '/map', Icon: MapPin },
  { label: LABELS.NAV.PROFILE, to: '/mypage', Icon: User },
];

export const FOOTER_CATEGORIES: readonly Omit<NavLink, 'Icon'>[] = [
  { label: LABELS.CATEGORY.DRAMA, to: '/drama' },
  { label: LABELS.CATEGORY.MOVIE, to: '/movie' },
  { label: LABELS.CATEGORY.KPOP, to: '/kpop' },
];

export const POLICY_LINKS: readonly FooterLink[] = [
  { label: LABELS.POLICY.PRIVACY, href: '/privacy' },
  { label: LABELS.POLICY.TERMS, href: '/terms' },
  { label: LABELS.POLICY.CONTACT, href: '/contact' },
];
