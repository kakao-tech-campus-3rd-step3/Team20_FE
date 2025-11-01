import { ServiceMainHero } from '@/features/ServiceMainHero';
import { CategorySection } from '@/features/CategorySection';
import { PopularSection } from '@/features/PopularSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'K-SPOT - K-콘텐츠 여행의 모든 것',
  description:
    '좋아하는 드라마, 영화, K-POP의 촬영지를 찾아 떠나는 특별한 여행. K-SPOT에서 나만의 K-콘텐츠 여행을 계획해보세요.',
  keywords: ['K-콘텐츠', '여행', '드라마', '영화', 'K-POP', '촬영지', '여행계획'],
  openGraph: {
    title: 'K-SPOT - K-콘텐츠 여행의 모든 것',
    description: '좋아하는 드라마, 영화, K-POP의 촬영지를 찾아 떠나는 특별한 여행',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function HomePage() {
  return (
    <main className="mx-auto max-w-screen-2xl px-[var(--spacing-container-padding)] md:px-[var(--spacing-container-padding-tablet)] lg:px-[var(--spacing-container-padding-desktop)]">
      <ServiceMainHero />
      <CategorySection />
      <PopularSection />
    </main>
  );
}
