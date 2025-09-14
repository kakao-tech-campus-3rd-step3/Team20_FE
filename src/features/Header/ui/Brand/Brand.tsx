import { Sparkles } from 'lucide-react';
import { BRAND_NAME } from '../../model/messages';
import { circleWH } from '@/shared/model/styles';

export function Brand() {
  return (
    <div className="group flex items-center gap-(--spacing-4)">
      <div
        className={`flex ${circleWH.md} items-center justify-center rounded-(--radius-xl) bg-gradient-to-br from-(--color-primary) to-(--color-accent) shadow-(--shadow-brand-md) transition-transform duration-300 group-hover:scale-110`}
      >
        <Sparkles className="h-(--spacing-6) w-(--spacing-6) text-(--color-primary-foreground)" aria-hidden />
      </div>
      <div className="bg-gradient-to-br from-(--color-primary) to-(--color-accent) bg-clip-text text-heading-3 text-transparent">
        {BRAND_NAME}
      </div>
    </div>
  );
}
