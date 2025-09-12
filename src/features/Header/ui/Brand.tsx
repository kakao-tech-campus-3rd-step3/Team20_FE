import { Sparkles } from 'lucide-react';
import { BRAND_NAME } from '../model/messages';
import { circleWH } from '@/shared/model/styles';

export function Brand() {
  return (
    <div className="group flex items-center gap-container-padding">
      <div
        className={`flex ${circleWH.md} items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-brand-md transition-transform duration-300 group-hover:scale-110`}
      >
        <Sparkles className="h-6 w-6 text-primary-foreground" aria-hidden />
      </div>
      <div className="bg-gradient-to-br from-primary to-accent bg-clip-text text-heading-3 text-transparent">
        {BRAND_NAME}
      </div>
    </div>
  );
}
