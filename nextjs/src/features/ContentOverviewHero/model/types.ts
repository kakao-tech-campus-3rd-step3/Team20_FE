export interface ContentOverviewHeroProps {
  contentId: string;
  description?: string;
  isLiked?: boolean;
}

export interface ContentOverviewIconGroupProps {
  onBackClick?: () => void;
  onShareClick?: () => void;
  onLikeClick?: () => void;
  isLiked?: boolean;
}

export interface ContentOverviewInfoProps {
  title: string;
  category: string;
  countOfLocations?: number;
}

export interface ContentOverviewActionButtonsProps {
  onMapViewClick?: () => void;
}
