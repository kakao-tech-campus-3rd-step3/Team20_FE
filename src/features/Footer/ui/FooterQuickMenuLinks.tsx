import { FOOTER_QUICK_LINKS } from '../model/constants';
import { FOOTER_TITLES } from '../model/messages';

export function FooterQuickMenuLinks() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">{FOOTER_TITLES.QUICK_LINKS}</h3>
      <ul className="space-y-2">
        {FOOTER_QUICK_LINKS.map(({ label, to, Icon }) => (
          <li key={label}>
            <a
              href={to}
              className="group flex items-center space-x-2 text-gray-300 transition-colors duration-200 hover:text-white"
              aria-label={label}
            >
              <Icon
                className="h-4 w-4 transition-transform duration-200 group-hover:scale-110"
                aria-hidden
              />
              <span className="text-sm">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
