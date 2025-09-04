import React from 'react';
import { SOCIAL_LINKS } from '@/features/footer/model/types';

export const FooterSocialLinks: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">소셜 미디어</h3>
      <div className="flex gap-4">
        {SOCIAL_LINKS.map(({ label, Icon }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="rounded-lg p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-800 hover:text-white"
          >
            <Icon className="h-5 w-5" aria-hidden />
          </a>
        ))}
      </div>
    </div>
  );
};
