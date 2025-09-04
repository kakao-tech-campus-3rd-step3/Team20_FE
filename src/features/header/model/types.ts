import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

/* IconButton 컴포넌트 Props */
export type IconButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'children'> & {
    Icon?: LucideIcon;
    children?: ReactNode;
    variant?: 'soft' | 'gradient' | 'outline' | 'ghost';
    shape?: 'pill' | 'circle';
    size?: 'sm' | 'md' | 'lg';
    active?: boolean;
    iconSize?: number | string;
};

export type NavKey = 'home' | 'map' | 'saved';

export type MenuItem = {
    key: NavKey;
    label: string;
    to: string;
    Icon: LucideIcon;
};

export type HeaderProps = {
    /* 현재 활성 메뉴 */
    active: NavKey;
    onSelect: (key: NavKey) => void;
};