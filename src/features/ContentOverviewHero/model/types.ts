import type { LucideIcon } from 'lucide-react';

export interface ContentOverviewHeroProps {
  title?: string;
  category?: string;
  description?: string;
  imageUrl?: string;
  countOfLocations?: number;
  isLiked?: boolean;
}

export interface ContentOverviewIconGroupProps {
  onBackClick?: () => void;
  onShareClick?: () => void;
  onLikeClick?: () => void;
  isLiked?: boolean;
}

export interface ContentIconButtonProps {
  icon: LucideIcon;
  iconClassName?: string;
  variant?: 'default' | 'transparent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export interface ContentOverviewInfoProps {
  title: string;
  category: string;
  description: string;
  countOfLocations?: number;
}

export interface ContentOverviewActionButtonsProps {
  onLocationViewClick?: () => void;
  onMapViewClick?: () => void;
}
