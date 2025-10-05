import { createFileRoute } from '@tanstack/react-router';
import { ServiceMainHero } from '@/features/ServiceMainHero';
import { CategorySection } from '@/features/CategorySection';
import { PopularCarousel } from '@/features/PopularCarousel';
import { SpotPreview } from '@/features/SpotPreview';
import { PopularRoutes } from '@/features/PopularRoutes';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4">
      <ServiceMainHero />
      <CategorySection />
      <PopularCarousel />
      <SpotPreview />
      <PopularRoutes />
    </main>
  );
}
