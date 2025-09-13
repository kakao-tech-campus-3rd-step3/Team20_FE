import { Button } from './Button';
import { messages } from '../model/messages';
import { PATHS } from '../model/path';
export function ServiceMainHero() {
  return (
    <section className="grid md:grid-cols-2 gap-[var(--spacing-8)] py-[var(--spacing-12)] px-[var(--spacing-container-padding)] md:px-[var(--spacing-container-padding-tablet)] lg:px-[var(--spacing-container-padding-desktop)]">
      <div className="flex flex-col justify-center gap-[var(--spacing-4)]">
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
      <div className="rounded-2xl border border-[--color-border-primary] aspect-video bg-[--color-background-secondary] grid place-items-center relative overflow-hidden shadow-[var(--shadow-card)]"></div>
    </section>
  );
}
