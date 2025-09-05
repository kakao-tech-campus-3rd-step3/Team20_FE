import type { LucideIcon } from 'lucide-react';
import { Mail, Twitter, Youtube, Instagram } from 'lucide-react';

/* ---------------- 타입 정의 ---------------- */
export type FooterLink = { label: string; href: string };
export type NavLink = { label: string; to: string };
export type SocialLink = { label: string; href: string; Icon: LucideIcon };

/* ---------------- 브랜드 상수 ---------------- */
export const BRAND_NAME = 'K-SPOT';
export const BRAND_SLOGAN = '한국 문화 콘텐츠를 전 세계와 연결하는 플랫폼입니다.';
export const BRAND_DESCRIPTION = 'K-Drama, 영화, K-POP 등 다양한 한국 문화를 만나보세요.';

/* ---------------- 카피라이트 ---------------- */
export const COPYRIGHT_TEXT = `© ${new Date().getFullYear()} KTC. All rights reserved.`;

/* ---------------- 퀵 링크 ---------------- */
export const FOOTER_QUICK_LINKS: readonly NavLink[] = [
  { label: '홈', to: '/' },
  { label: '촬영지 지도', to: '/map' },
  { label: '저장된 장소', to: '/saved' },
  { label: '프로필', to: '/profile' },
];

/* ---------------- 카테고리 ---------------- */
export const FOOTER_CATEGORIES: readonly NavLink[] = [
  { label: 'K-드라마', to: '/drama' },
  { label: 'K-영화', to: '/movie' },
  { label: 'K-POP', to: '/kpop' },
];

/* ---------------- 정책 링크 ---------------- */
export const POLICY_LINKS: readonly FooterLink[] = [
  { label: '개인정보처리방침', href: '/privacy' },
  { label: '이용약관', href: '/terms' },
  { label: '고객센터', href: '/contact' },
];

/* ---------------- 소셜 링크 ---------------- */
export const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: 'Instagram', href: '#', Icon: Instagram },
  { label: 'YouTube', href: '#', Icon: Youtube },
  { label: 'Mail', href: '#', Icon: Mail },
  { label: 'Twitter', href: '#', Icon: Twitter },
];
