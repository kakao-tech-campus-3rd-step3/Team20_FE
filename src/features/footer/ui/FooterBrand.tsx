import React from 'react';
import { BRAND_SLOGAN, BRAND_DESCRIPTION } from '@/features/Footer/model/types';
import { Brand } from '@/features/Header/ui/Brand';

export const FooterBrand: React.FC = () => {
  return (
    <div className="space-y-4">
      <Brand />
      <div className="space-y-2">
        <p className="text-sm leading-relaxed text-gray-300">{BRAND_SLOGAN}</p>
        <p className="text-xs text-gray-400">{BRAND_DESCRIPTION}</p>
      </div>
    </div>
  );
};
