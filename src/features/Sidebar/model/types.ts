export type PlaceCardProps = {
    thumbnailUrl?: string;
    name?: string;
    address?: string;
    tags?: string[];
    rating?: number;
    onClick?: () => void;
    className?: string;
    badgeNumber?: number;
};

export type Place = {
    id: string;
    name: string;
    address: string;
    tags: string[];
    rating: number;
    thumbnailUrl?: string;
};

export type PlaceListProps = {
    places?: Place[];
    className?: string;
};

export type SidebarProps = {
    className?: string;
};

export type SidebarSearchProps = {
    className?: string;
};

export type ThumbnailProps = Pick<PlaceCardProps, 'thumbnailUrl' | 'name' | 'badgeNumber'>;
