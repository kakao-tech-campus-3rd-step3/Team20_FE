import Link from 'next/link';
import { messages } from '../../model/messages';
import { PATHS } from '../../model/path';

export function ServiceMainHero() {
  return (
    <section className="py-[var(--spacing-24)] px-[var(--spacing-container-padding)] md:px-[var(--spacing-container-padding-tablet)] lg:px-[var(--spacing-container-padding-desktop)] pb-[var(--spacing-24)]">
      <div className="flex flex-col items-center text-center justify-center gap-[var(--spacing-16)] max-w-prose mx-auto">
        <h1 className="text-heading-2 md:text-heading-1 text-[--color-text-primary]">
          {messages.heroTitle}
        </h1>
        <p className="text-heading-4 text-[--color-text-secondary]">{messages.heroSub}</p>
        <div className="flex flex-col sm:flex-row gap-[var(--spacing-4)]">
          <Link
            href={PATHS.MAP}
            className="px-[var(--spacing-12)] py-[var(--spacing-4)] rounded-xl text-button bg-[var(--color-brand-secondary)] text-[var(--color-text-inverse)] shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-button-hover)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-border-focus]"
          >
            {messages.Browse}
          </Link>
          <Link
            href="/itinerary"
            className="px-[var(--spacing-12)] py-[var(--spacing-4)] rounded-xl text-button bg-[var(--color-brand-primary)] text-[var(--color-text-inverse)] shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-button-hover)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-border-focus)] flex items-center gap-2"
          >
            🎬 AI 여행 일정 생성기
          </Link>
        </div>
      </div>
    </section>
  );
}
