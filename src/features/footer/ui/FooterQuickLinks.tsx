import React from 'react';
import { FOOTER_QUICK_LINKS } from '@/features/footer/model/types';
import { Home, MapPin, Heart, User } from 'lucide-react';

const ICONS: Record<string, React.ReactNode> = {
  '홈': <Home className="h-4 w-4" aria-hidden />,
  '촬영지 지도': <MapPin className="h-4 w-4" aria-hidden />,
  '저장된 장소': <Heart className="h-4 w-4" aria-hidden />,
  '프로필': <User className="h-4 w-4" aria-hidden />,
};

export const FooterQuickLinks: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">빠른 링크</h3>
      <ul className="space-y-2">
        {FOOTER_QUICK_LINKS.map((link) => (
          <li key={link.label}>
            <a
              href="#"
              className="group flex items-center space-x-2 text-gray-300 transition-colors duration-200 hover:text-white"
            >
              <span className="transition-transform duration-200 group-hover:scale-110">
                {ICONS[link.label]}
              </span>
              <span className="text-sm">{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
