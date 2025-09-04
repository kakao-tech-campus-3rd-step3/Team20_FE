import React from 'react';
import { FooterBrand } from '@/features/footer/ui/FooterBrand';
import { FooterSocialLinks } from '@/features/footer/ui/FooterSocialLinks';
import { FooterQuickLinks } from '@/features/footer/ui/FooterQuickLinks';
import { FooterCategories } from '@/features/footer/ui/FooterCategories';
import { FooterBottom } from '@/features/footer/ui/FooterBottom';

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
