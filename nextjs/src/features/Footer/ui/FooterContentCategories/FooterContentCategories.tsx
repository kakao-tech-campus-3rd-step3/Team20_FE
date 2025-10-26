'use client';

import { FOOTER_CATEGORIES } from '../../model/constants';
import { FOOTER_TITLES } from '../../model/messages';
import Link from 'next/link';

export function FooterContentCategories() {
  return (
    <div className="flex flex-col gap-(--spacing-4)">
      <h3 className="text-heading-4 text-(--color-text-inverse)">{FOOTER_TITLES.CATEGORIES}</h3>
      <ul className="flex flex-col gap-(--spacing-3)">
        {FOOTER_CATEGORIES.map((cat) => (
          <li key={cat.label}>
            <Link
              href={cat.href}
              className="block text-(--color-text-secondary) transition-colors duration-200 hover:text-(--color-text-inverse)
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/60 focus-visible:ring-offset-2"
            >
              <span className="text-body-small font-medium">{cat.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
