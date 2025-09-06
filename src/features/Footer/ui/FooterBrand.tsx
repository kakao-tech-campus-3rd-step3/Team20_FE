import { BRAND } from '../model/messages';
import { Brand } from '@/features/Header/ui/Brand';

export function FooterBrand() {
  return (
    <div className="space-y-4">
      <Brand />
      <div className="space-y-2">
        <p className="text-sm leading-relaxed text-gray-300">{BRAND.slogan}</p>
        <p className="text-xs text-gray-400">{BRAND.description}</p>
      </div>
    </div>
  );
}
