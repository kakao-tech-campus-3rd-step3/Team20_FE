import { SOCIAL_LINKS } from '../model/constants';
import { FOOTER_TITLES } from '../model/messages';

export function FooterSocialLinks() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-heading-4 text-text-inverse">{FOOTER_TITLES.SOCIAL}</h3>
      <div className="flex gap-4">
        {SOCIAL_LINKS.map(({ label, Icon }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="rounded-md p-2 text-text-tertiary transition-colors duration-200 hover:bg-muted hover:text-text-inverse"
          >
            <Icon className="h-5 w-5" aria-hidden />
          </a>
        ))}
      </div>
    </div>
  );
}
