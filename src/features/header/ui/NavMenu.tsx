import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Sparkles, MapPin, Heart } from 'lucide-react';

export type NavKey = 'home' | 'map' | 'saved';

const MENU: { key: NavKey; label: string; href: string; Icon: LucideIcon }[] = [
  { key: 'home',  label: '홈',   href: '/',      Icon: Sparkles },
  { key: 'map',   label: '지도', href: '/map',  Icon: MapPin },
  { key: 'saved', label: '저장됨', href: '/saved', Icon: Heart },
];

export function NavMenu({
  active: externalActive,
  onSelect,
}: {
  active?: NavKey;
  onSelect?: (key: NavKey) => void;
}) {
  const [internalActive, setInternalActive] = useState<NavKey>('home');
  const active = externalActive ?? internalActive;

  const handleClick = (key: NavKey, href: string) => {
    setInternalActive(key);
    if (onSelect) {
      onSelect(key);
    } else {
      window.location.href = href;
    }
  };

  return (
    <nav aria-label="주요 메뉴" className="hidden md:flex items-center space-x-8">
      {MENU.map(({ key, label, href, Icon }) => (
        <a
          key={key}
          href={href}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 font-medium ${
            key === active
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
              : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
          }`}
          aria-current={key === active ? 'page' : undefined}
          onClick={(e) => {
            e.preventDefault();
            handleClick(key, href);
          }}
        >
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}
