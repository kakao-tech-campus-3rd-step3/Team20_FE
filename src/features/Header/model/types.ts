import type { LucideIcon } from 'lucide-react';
import type { NavigateOptions, RegisteredRouter, ParsedLocation } from '@tanstack/react-router';

export type NavKey = 'home' | 'map' | 'content';

export type MenuItem = {
  key: NavKey;
  label: string;
  to: string;
  Icon: LucideIcon;
};

// TanStack Router의 타입 시스템을 활용한 네비게이션 옵션 타입
export type RouterNavigateOptions = NavigateOptions<RegisteredRouter>;

// 각 NavKey에 대한 정확한 라우트 타입 매핑
export type NavRouteMap = {
  home: { to: '/' };
  map: { to: '/map' };
  content: { to: '/' }; // content는 기본적으로 홈으로 리다이렉트
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
