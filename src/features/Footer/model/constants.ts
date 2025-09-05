import { Mail, Twitter, Youtube, Instagram, Home, MapPin, Heart, User } from 'lucide-react';
import type { FooterLink, NavLink, SocialLink } from './types';

export const BRAND_NAME = 'K-SPOT';
export const BRAND_SLOGAN = '한국 문화 콘텐츠를 전 세계와 연결하는 플랫폼입니다.';
export const BRAND_DESCRIPTION = 'K-Drama, 영화, K-POP 등 다양한 한국 문화를 만나보세요.';

export const COPYRIGHT_TEXT = `© ${new Date().getFullYear()} KTC. All rights reserved.`;

export const FOOTER_QUICK_LINKS: readonly NavLink[] = [
  { label: '홈', to: '/', Icon: Home },
  { label: '촬영지 지도', to: '/map', Icon: MapPin },
  { label: '저장된 장소', to: '/saved', Icon: Heart },
  { label: '프로필', to: '/profile', Icon: User },
];

export const FOOTER_CATEGORIES: readonly Omit<NavLink, 'Icon'>[] = [
  { label: 'K-드라마', to: '/drama' },
  { label: 'K-영화', to: '/movie' },
  { label: 'K-POP', to: '/kpop' },
];

export const POLICY_LINKS: readonly FooterLink[] = [
  { label: '개인정보처리방침', href: '/privacy' },
  { label: '이용약관', href: '/terms' },
  { label: '고객센터', href: '/contact' },
];

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: 'Instagram', href: '#', Icon: Instagram },
  { label: 'YouTube', href: '#', Icon: Youtube },
  { label: 'Mail', href: '#', Icon: Mail },
  { label: 'Twitter', href: '#', Icon: Twitter },
];

export const FOOTER_TITLES = {
  CATEGORIES: '카테고리',
  QUICK_LINKS: '빠른 링크',
  SOCIAL: '소셜 미디어',
};
