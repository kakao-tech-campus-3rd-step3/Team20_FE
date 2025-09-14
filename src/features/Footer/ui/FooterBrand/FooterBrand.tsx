import { BRAND } from '../../model/messages';
import { Brand } from '@/features/Header/ui/Brand/Brand';

export function FooterBrand() {
  return (
    <div className="flex flex-col gap-(--spacing-4)">
      <Brand />
      <div className="flex flex-col gap-(--spacing-2)">
        <p className="text-body-small leading-relaxed text-(--color-text-secondary)">{BRAND.slogan}</p>
        <p className="text-caption text-(--color-text-tertiary)">{BRAND.description}</p>
      </div>
    </div>
  );
}
