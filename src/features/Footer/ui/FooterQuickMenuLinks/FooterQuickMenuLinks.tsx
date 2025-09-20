import { FOOTER_QUICK_LINKS } from '../../model/constants';
import { FOOTER_TITLES } from '../../model/messages';

export function FooterQuickMenuLinks() {
  return (
    <div className="flex flex-col gap-(--spacing-4)">
      <h3 className="text-heading-4 text-(--color-text-inverse)">{FOOTER_TITLES.QUICK_LINKS}</h3>
      <ul className="flex flex-col gap-(--spacing-2)">
        {FOOTER_QUICK_LINKS.map(({ label, to, Icon }) => (
          <li key={label}>
            <a
              href={to}
              className="group flex items-center gap-(--spacing-2) text-(--color-text-secondary) transition-colors duration-200 hover:text-(--color-text-inverse)"
              aria-label={label}
            >
              <Icon
                className="h-(--spacing-4) w-(--spacing-4) transition-transform duration-200 group-hover:scale-110"
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
