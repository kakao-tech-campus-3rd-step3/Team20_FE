'use client';

import { FOOTER_QUICK_LINKS } from '../../model/constants';
import { FOOTER_TITLES } from '../../model/messages';

export function FooterQuickMenuLinks() {
  return (
    <div className="flex flex-col gap-[var(--spacing-4)]">
      <h3 className="text-heading-4 text-[var(--color-text-inverse)]">{FOOTER_TITLES.QUICK_LINKS}</h3>
      <ul className="flex flex-col gap-[var(--spacing-2)]">
        {FOOTER_QUICK_LINKS.map(({ label, href, Icon }) => (
          <li key={label}>
            <a
              href={href}
              className="group flex items-center gap-[var(--spacing-2)] text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-text-inverse)]"
              aria-label={label}
            >
              <Icon
                className="h-[var(--spacing-4)] w-[var(--spacing-4)] transition-transform duration-200 group-hover:scale-110"
                aria-hidden
              />
              <span className="text-body-small">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
