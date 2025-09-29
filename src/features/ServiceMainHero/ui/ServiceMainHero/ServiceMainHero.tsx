import { Button } from '../Button/Button';
import { messages } from '../../model/messages';
import { PATHS } from '../../model/path';
import { usePopularContents } from '@/entities/content/api/queryfn';
import type { PopularContent } from '@/entities/content/model/types';

export function ServiceMainHero() {
  const {
    data = [],
    isLoading,
    isError,
  } = usePopularContents() as {
    data: PopularContent[];
    isLoading: boolean;
    isError: boolean;
  };
  const first = data[0];

  return (
    <section className="grid md:grid-cols-2 gap-[var(--spacing-8)] py-[var(--spacing-12)] px-[var(--spacing-container-padding)] md:px-[var(--spacing-container-padding-tablet)] lg:px-[var(--spacing-container-padding-desktop)]">
      <div className="flex flex-col justify-center gap-[var(--spacing-12)]">
        <h1 className="text-heading-2 md:text-heading-1 text-[--color-text-primary]">
          {messages.heroTitle}
        </h1>
        <p className="text-body text-[--color-text-secondary]">{messages.heroSub}</p>
        <div className="flex gap-[var(--spacing-4)]">
          <Button href={PATHS.MAP} variant="primary">
            {messages.Browse}
          </Button>
          <Button href={PATHS.MAP} variant="secondary">
            {messages.Map}
          </Button>
        </div>
      </div>
      <div className="rounded-2xl border border-[--color-border-primary] bg-[--color-background-secondary] overflow-hidden shadow-[var(--shadow-card)]">
        {isLoading && (
          <div className="aspect-video bg-[--color-background-primary] animate-pulse" />
        )}
        {isError && <div className="aspect-video bg-[--color-background-primary]" />}
        {!isLoading && !isError && first && (
          <img
            src={first.posterImageUrl}
            alt={first.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
        {!isLoading && !isError && !first && (
          <div className="aspect-video bg-[--color-background-primary]" />
        )}
      </div>
    </section>
  );
}
