import { FOOTER_QUICK_LINKS } from '../model/constants';
import { FOOTER_TITLES } from '../model/messages';

export function FooterQuickMenuLinks() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-heading-4 text-text-inverse">{FOOTER_TITLES.QUICK_LINKS}</h3>
      <ul className="flex flex-col gap-2">
        {FOOTER_QUICK_LINKS.map(({ label, to, Icon }) => (
          <li key={label}>
            <a
              href={to}
              className="group flex items-center gap-2 text-text-secondary transition-colors duration-200 hover:text-text-inverse"
              aria-label={label}
            >
              <Icon
                className="h-4 w-4 transition-transform duration-200 group-hover:scale-110"
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
