import type { ComponentType } from 'react';
import type { LocationDetail } from '@/entities/location/model/types';
// ===== 도메인 타입 =====
export interface ContentScene {
  id: number;
  title: string;
  description: string;
  image: string;
  episode: string;
  timestamp: string;
}

// ===== 공통 UI 타입 =====
export type NavigationPosition = 'left' | 'right';

export interface BaseNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  onGoToSlide: (index: number) => void;
}

// ===== 컴포넌트 Props 타입 =====
export interface LocationImageGalleryProps extends BaseNavigationProps {
  currentIndex: number;
  scenes: ContentScene[];
}

export interface LocationImageNavButtonProps {
  onClick: () => void;
  icon: ComponentType<{ className?: string }>;
  position: NavigationPosition;
}

export interface LocationImageContentProps {
  scene: ContentScene;
}

export interface LocationImageCounterProps {
  current: number;
  total: number;
}

export interface LocationImageIndicatorsProps extends Pick<BaseNavigationProps, 'onGoToSlide'> {
  total: number;
  currentIndex: number;
}

export interface LocationImageThumbnailsProps extends Pick<BaseNavigationProps, 'onGoToSlide'> {
  scenes: ContentScene[];
  currentIndex: number;
}

export interface UseLocationImageCarouselProps {
  locations: LocationDetail[];
}
