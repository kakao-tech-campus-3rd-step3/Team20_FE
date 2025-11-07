import { BRAND } from '../../model/messages';
import { Brand } from '@/features/Header/ui/Brand/Brand';

export function FooterBrand() {
  return (
    <div className="flex flex-col gap-[var(--spacing-4)]">
      <Brand />
      <div className="flex flex-col gap-[var(--spacing-2)]">
        <p className="text-body-small leading-relaxed text-[var(--color-text-inverse)]">
          {BRAND.slogan}
        </p>
        <p className="text-caption text-[var(--color-text-tertiary)]">{BRAND.description}</p>
      </div>
    </div>
  );
}
