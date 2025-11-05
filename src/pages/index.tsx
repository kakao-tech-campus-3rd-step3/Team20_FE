import { createFileRoute } from '@tanstack/react-router';
import { ErrorBoundary } from '@/shared/ui';
import { ServiceMainHero } from '@/features/ServiceMainHero';
import { CategorySection } from '@/features/CategorySection';
import { PopularSection } from '@/features/PopularSection';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <main className="mx-auto max-w-screen-2xl px-[var(--spacing-container-padding)] md:px-[var(--spacing-container-padding-tablet)] lg:px-[var(--spacing-container-padding-desktop)]">
      <ServiceMainHero />
      <CategorySection />
      <ErrorBoundary>
        <PopularSection />
      </ErrorBoundary>
    </main>
  );
}
