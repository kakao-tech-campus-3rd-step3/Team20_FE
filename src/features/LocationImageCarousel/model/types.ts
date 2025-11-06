import type { ComponentType } from 'react';
import type { LocationDetail } from '@/entities/location/model/types';
import type { ContentLocation } from '@/entities/content/model/types';

export interface ContentScene {
  id: number;
  title: string;
  description?: string;
  image?: string;
  episode: string;
  timestamp: string;
}

export type NavigationPosition = 'left' | 'right';

export interface BaseNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  onGoToSlide: (index: number) => void;
}

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
  contentLocations: ContentLocation[];
}

export interface LocationImageCarouselProps {
  contentId: string;
}
