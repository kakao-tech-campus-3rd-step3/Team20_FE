export type MapContainerProps = {
    className?: string;
};

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

export const PLACE_CARD_DEFAULT = {
    NAME: '장소 이름',
    ADDRESS: '주소 정보',
    TAGS: ['촬영지', '메인', '게임'],
    RATING: 4.8,
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