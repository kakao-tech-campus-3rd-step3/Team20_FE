import { BRAND } from '../model/messages';
import { Brand } from '@/features/Header/ui/Brand';

export function FooterBrand() {
  return (
    <div className="flex flex-col gap-4">
      <Brand />
      <div className="flex flex-col gap-2">
        <p className="text-body-small leading-relaxed text-text-secondary">{BRAND.slogan}</p>
        <p className="text-caption text-text-tertiary">{BRAND.description}</p>
      </div>
    </div>
  );
}
