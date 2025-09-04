import type { LucideIcon } from 'lucide-react';
import { Sparkles, MapPin, Heart } from 'lucide-react';
import { IconButton } from '@/features/header/ui/IconButton';

export type NavKey = 'home' | 'map' | 'saved';

const MENU: { key: NavKey; label: string; href: string; Icon: LucideIcon }[] = [
  { key: 'home',  label: '홈',   href: '/',     Icon: Sparkles },
  { key: 'map',   label: '지도', href: '/map',  Icon: MapPin },
  { key: 'saved', label: '저장됨', href: '/saved', Icon: Heart },
];

export function NavMenu({
  active,
  onSelect,
}: {
  active?: NavKey;
  onSelect?: (key: NavKey) => void;
}) {
  return (
    <nav aria-label="주요 메뉴" className="hidden md:flex items-center space-x-3">
      {MENU.map(({ key, label, href, Icon }) => (
        <IconButton
          key={key}
          Icon={Icon}
          shape="pill"
          size="md"
          variant="soft"
          active={key === active}
          aria-current={key === active ? 'page' : undefined}
          onClick={() => onSelect?.(key)}
          data-href={href}
        >
          {label}
        </IconButton>
      ))}
    </nav>
  );
}
