import React from 'react';
import { Sparkles } from 'lucide-react';
import { BRAND_NAME, BRAND_SLOGAN, BRAND_DESCRIPTION } from '@/features/footer/model/types';

export const FooterBrand: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* 로고(차후 Brand.tsx 치환 가능) */}
      <div className="group flex items-center space-x-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 transition-transform duration-300 group-hover:scale-110">
          <Sparkles className="h-6 w-6 text-white" aria-hidden />
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-2xl font-bold text-transparent">
          {BRAND_NAME}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm leading-relaxed text-gray-300">{BRAND_SLOGAN}</p>
        <p className="text-xs text-gray-400">{BRAND_DESCRIPTION}</p>
      </div>
    </div>
  );
};
