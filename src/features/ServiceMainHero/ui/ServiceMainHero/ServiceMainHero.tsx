import { Button } from '../Button/Button';
import { messages } from '../../model/messages';
import { PATHS } from '../../model/path';

export function ServiceMainHero() {
  return (
    <section className="py-[var(--spacing-24)] px-[var(--spacing-container-padding)] md:px-[var(--spacing-container-padding-tablet)] lg:px-[var(--spacing-container-padding-desktop)] pb-[var(--spacing-24)]">
      <div className="flex flex-col items-center text-center justify-center gap-[var(--spacing-16)] max-w-prose mx-auto">
        <h1 className="md:text-heading-1 text-[--color-text-primary]">{messages.heroTitle}</h1>
        <p className="text-heading-4 text-[--color-text-secondary]">{messages.heroSub}</p>
        <div className="flex gap-[var(--spacing-4)]">
          <Button href={PATHS.MAP} variant="primary">
            {messages.Browse}
          </Button>
        </div>
      </div>
    </section>
  );
}
