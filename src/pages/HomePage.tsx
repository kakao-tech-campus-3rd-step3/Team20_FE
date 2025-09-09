import { ServiceMainHero } from '@/features/ServiceMainHero';
import { CategorySection } from '@/features/CategorySection';
import { PopularCarousel } from '@/features/PopularCarousel';
import { SpotPreview } from '@/features/SpotPreview';
import { PopularRoutes } from '@/features/PopularRoutes';

export const HomePage = () => {
  return (
    <main className="mx-auto max-w-7xl px-4">
      <ServiceMainHero />
      <CategorySection />
      <PopularCarousel />
      <SpotPreview />
      <PopularRoutes />
    </main>
  );
};
