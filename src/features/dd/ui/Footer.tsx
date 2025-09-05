import React from 'react';
import { FooterBrand } from '@/features/dd/ui/FooterBrand';
import { FooterSocialLinks } from '@/features/dd/ui/FooterSocialLinks';
import { FooterQuickLinks } from '@/features/dd/ui/FooterQuickLinks';
import { FooterCategories } from '@/features/dd/ui/FooterCategories';
import { FooterBottom } from '@/features/dd/ui/FooterBottom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white" aria-label="사이트 푸터">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FooterBrand />
          <FooterSocialLinks />
          <FooterQuickLinks />
          <FooterCategories />
        </div>
      </div>

      <FooterBottom />
    </footer>
  );
};
