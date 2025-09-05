import React from 'react';
import { POLICY_LINKS, COPYRIGHT_TEXT } from '@/features/dd/model/types';

export const FooterBottom: React.FC = () => {
  return (
    <div className="border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm text-gray-400 md:text-left">
          {COPYRIGHT_TEXT}
        </p>

        <nav aria-label="정책 링크" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {POLICY_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};
