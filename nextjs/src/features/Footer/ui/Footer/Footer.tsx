'use client';

import { FooterBrand } from '../FooterBrand/FooterBrand';
import { FooterQuickMenuLinks } from '../FooterQuickMenuLinks/FooterQuickMenuLinks';
import { FooterContentCategories } from '../FooterContentCategories/FooterContentCategories';
import { FooterBottom } from '../FooterBottom/FooterBottom';

export function Footer() {
  return (
    <footer
      className="bg-[var(--color-background-dark)] text-[var(--color-primary-foreground)]"
      aria-label="사이트 푸터"
    >
      <div className="mx-auto max-w-7xl px-container-padding sm:px-container-padding-tablet lg:px-container-padding-desktop py-card-padding">
        <div className="grid grid-cols-1 gap-[var(--spacing-8)] md:grid-cols-2 lg:grid-cols-3">
          <FooterBrand />
          <FooterQuickMenuLinks />
          <FooterContentCategories />
        </div>
      </div>

      <FooterBottom />
    </footer>
  );
}
