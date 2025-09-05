import { Sparkles, MapPin, Heart } from 'lucide-react';
import type { MenuItem, NavKey } from '@/features/Header/model/types';

export function cn(...xs: Array<string | false | null | undefined>) {
    return xs.filter(Boolean).join(' ');
}

/* ----------------------------- 디자인 토큰 ----------------------------- */
export const sizeClass = {
    sm: 'h-8 text-sm',
    md: 'h-10',
    lg: 'h-11 text-base',
} as const;

export const pxClass = {
    sm: 'px-3',
    md: 'px-4',
    lg: 'px-5',
} as const;

export const circleWH = {
    sm: 'size-8',
    md: 'size-10',
    lg: 'size-11',
} as const;

export const iconSizeByControl = {
    sm: '1rem',
    md: '1.125rem',
    lg: '1.25rem',
} as const;

/* 유형별 스타일 클래스 */
export const variantClass = {
    soft: 'bg-white text-gray-700 hover:text-purple-600 hover:bg-purple-50',
    gradient:
        'text-white bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg hover:shadow-xl border border-transparent',
    outline:
        'bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-gray-900',
    ghost:
        'bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900',
} as const;

/* ----------------------------- 네비 데이터/매핑 ----------------------------- */
export const MENU: MenuItem[] = [
    { key: 'home', label: '홈', to: '/', Icon: Sparkles },
    { key: 'map', label: '지도', to: '/map', Icon: MapPin },
    { key: 'saved', label: '저장됨', to: '/saved', Icon: Heart },
];

export const keyToPath: Record<NavKey, string> = {
    home: '/',
    map: '/map',
    saved: '/saved',
};

export function pathToKey(p: string): NavKey {
    if (p.startsWith('/map')) return 'map';
    if (p.startsWith('/saved')) return 'saved';
    return 'home';
}
