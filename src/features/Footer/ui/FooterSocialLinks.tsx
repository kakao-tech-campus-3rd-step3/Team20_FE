import { SOCIAL_LINKS, FOOTER_TITLES } from '@/features/Footer/model/constants';

export function FooterSocialLinks() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">{FOOTER_TITLES.SOCIAL}</h3>
      <div className="flex gap-4">
        {SOCIAL_LINKS.map(({ label, Icon }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="rounded-lg p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-800 hover:text-white"
          >
            <Icon className="h-5 w-5" aria-hidden />
          </a>
        ))}
      </div>
    </div>
  );
}
