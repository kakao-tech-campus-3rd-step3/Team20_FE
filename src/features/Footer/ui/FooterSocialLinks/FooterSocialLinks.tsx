import { SOCIAL_LINKS } from '../../model/constants';
import { FOOTER_TITLES } from '../../model/messages';

export function FooterSocialLinks() {
  return (
    <div className="flex flex-col gap-(--spacing-4)">
      <h3 className="text-heading-4 text-(--color-text-inverse)">{FOOTER_TITLES.SOCIAL}</h3>
      <div className="flex gap-(--spacing-4)">
        {SOCIAL_LINKS.map(({ label, Icon }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="rounded-(--radius-md) p-(--spacing-2) text-(--color-text-tertiary) transition-colors duration-200 hover:bg-(--color-muted) hover:text-(--color-text-inverse)"
          >
            <Icon className="h-(--spacing-5) w-(--spacing-5)" aria-hidden />
          </a>
        ))}
      </div>
    </div>
  );
}
