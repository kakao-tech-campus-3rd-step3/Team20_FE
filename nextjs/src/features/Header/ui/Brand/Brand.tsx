import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { BRAND_NAME } from '../../model/messages';
import { circleWH } from '@/shared/model/styles';

export function Brand() {
  return (
    <Link
      href="/"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="group flex items-center gap-(--spacing-4) transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/60 focus-visible:ring-offset-2 rounded-lg"
      aria-label="홈페이지로 이동"
    >
      <div
        className={`flex ${circleWH.md} items-center justify-center rounded-(--radius-xl) bg-gradient-to-br from-(--color-primary) to-(--color-accent) shadow-(--shadow-brand-md) transition-transform duration-300 group-hover:scale-110`}
      >
        <Sparkles
          className="h-(--spacing-6) w-(--spacing-6) text-(--color-primary-foreground)"
          aria-hidden
        />
      </div>
      <div className="bg-gradient-to-br from-(--color-primary) to-(--color-accent) bg-clip-text text-heading-3 text-transparent">
        {BRAND_NAME}
      </div>
    </Link>
  );
}
