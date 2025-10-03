import { createFileRoute } from '@tanstack/react-router';
import { ServiceMainHero } from '@/features/ServiceMainHero';
import { CategorySection } from '@/features/CategorySection';
import { PopularSection } from '@/features/PopularSection';
import { SpotPreview } from '@/features/SpotPreview';
import { PopularRoutes } from '@/features/PopularRoutes';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <main className="mx-auto max-w-screen-2xl px-3">
      <ServiceMainHero />
      <CategorySection />
      <PopularSection />
      <SpotPreview />
      <PopularRoutes />
    </main>
  );
}
