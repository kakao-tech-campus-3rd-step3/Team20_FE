export type PlaceCardProps = {
  locationImage?: string;
  name?: string;
  address?: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  relatedContents?: Array<{
    contentId: number;
    title: string;
    category: 'DRAMA' | 'MOVIE' | 'POP';
  }>;
  onClick?: () => void;
  className?: string;
  badgeNumber?: number;
};

export type Place = {
  locationId: number;
  name: string;
  address: string;
  description: string;
  locationImage: string;
  latitude: number;
  longitude: number;
  relatedContents: Array<{
    contentId: number;
    title: string;
    category: 'DRAMA' | 'MOVIE' | 'POP';
  }>;
};

export type PlaceListProps = {
  places?: Place[];
  className?: string;
};

export type SidebarProps = {
  className?: string;
  contentId?: string;
};

export type SidebarSearchProps = {
  className?: string;
};

export type ThumbnailProps = Pick<PlaceCardProps, 'locationImage' | 'name' | 'badgeNumber'>;
