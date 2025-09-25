export interface ContentOverviewHeroProps {
  contentId?: string;
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
