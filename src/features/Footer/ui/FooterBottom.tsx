import { POLICY_LINKS } from '../model/constants';
import { COPYRIGHT_TEXT } from '../model/messages';

export function FooterBottom() {
  return (
    <div className="border-t border-border-secondary">
      <div className="mx-auto max-w-7xl px-container-padding sm:px-container-padding-tablet lg:px-container-padding-desktop py-card-padding flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-body-small text-text-tertiary md:text-left">
          {COPYRIGHT_TEXT}
        </p>

        <nav
          aria-label="정책 링크"
          className="flex flex-wrap items-center gap-x-6 gap-y-2"
        >
          {POLICY_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-body-small text-text-tertiary transition-colors duration-200 hover:text-text-inverse"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
