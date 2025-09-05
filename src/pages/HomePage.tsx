import { Hero } from '@/features/Hero/ui/Hero';
import { CategorySection } from '@/features/CategorySection/ui/CategorySection';
import { PopularCarousel } from '@/features/PopularCarousel/ui/PopularCarousel';
import { SpotPreview } from '@/features/SpotPreview/ui/SpotPreview';
import { PopularRoutes } from '@/features/PopularRoutes/ui/PopularRoutes';

export const HomePage = () => {
  return (
    <main className="mx-auto max-w-7xl px-4">
      <Hero />
      <CategorySection />
      <PopularCarousel />
      <SpotPreview />
      <PopularRoutes />
    </main>
  );
};
