import { Hero } from '@/features/Hero';
import { CategorySection } from '@/features/CategorySection';
import { PopularCarousel } from '@/features/PopularCarousel';
import { SpotPreview } from '@/features/SpotPreview';
import { PopularRoutes } from '@/features/PopularRoutes';

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
