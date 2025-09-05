import { FooterBrand } from '@/features/Footer/ui/FooterBrand';
import { FooterSocialLinks } from '@/features/Footer/ui/FooterSocialLinks';
import { FooterQuickMenuLinks } from '@/features/Footer/ui/FooterQuickMenuLinks';
import { FooterContentCategories } from '@/features/Footer/ui/FooterContentCategories';
import { FooterBottom } from '@/features/Footer/ui/FooterBottom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white" aria-label="사이트 푸터">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FooterBrand />
          <FooterSocialLinks />
          <FooterQuickMenuLinks />
          <FooterContentCategories />
        </div>
      </div>

      <FooterBottom />
    </footer>
  );
}
