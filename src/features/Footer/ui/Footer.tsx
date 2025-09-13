import { FooterBrand } from './FooterBrand';
import { FooterSocialLinks } from './FooterSocialLinks';
import { FooterQuickMenuLinks } from './FooterQuickMenuLinks';
import { FooterContentCategories } from './FooterContentCategories';
import { FooterBottom } from './FooterBottom';

export function Footer() {
  return (
    <footer className="bg-background-dark text-primary-foreground" aria-label="사이트 푸터">
      <div className="mx-auto max-w-7xl px-container-padding sm:px-container-padding-tablet lg:px-container-padding-desktop py-card-padding">
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
