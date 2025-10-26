import { Mail, Twitter, Youtube, Instagram, Home, MapPin, Heart, User } from 'lucide-react';
import type { FooterLink, NavLink, SocialLink } from './types';
import { LABELS } from './messages';

export const FOOTER_QUICK_LINKS: readonly NavLink[] = [
  { label: LABELS.NAV.HOME, href: '/', Icon: Home },
  { label: LABELS.NAV.MAP, href: '/map', Icon: MapPin },
  { label: LABELS.NAV.SAVED, href: '/saved', Icon: Heart },
  { label: LABELS.NAV.PROFILE, href: '/profile', Icon: User },
];

export const FOOTER_CATEGORIES: readonly Omit<NavLink, 'Icon'>[] = [
  { label: LABELS.CATEGORY.DRAMA, href: '/drama' },
  { label: LABELS.CATEGORY.MOVIE, href: '/movie' },
  { label: LABELS.CATEGORY.KPOP, href: '/kpop' },
];

export const POLICY_LINKS: readonly FooterLink[] = [
  { label: LABELS.POLICY.PRIVACY, href: '/privacy' },
  { label: LABELS.POLICY.TERMS, href: '/terms' },
  { label: LABELS.POLICY.CONTACT, href: '/contact' },
];

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: LABELS.SOCIAL.INSTAGRAM, href: '#', Icon: Instagram },
  { label: LABELS.SOCIAL.YOUTUBE, href: '#', Icon: Youtube },
  { label: LABELS.SOCIAL.MAIL, href: '#', Icon: Mail },
  { label: LABELS.SOCIAL.TWITTER, href: '#', Icon: Twitter },
];
