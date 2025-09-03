import type { LucideIcon } from 'lucide-react';

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
