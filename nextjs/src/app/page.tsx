import { Suspense } from 'react';
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

export const dynamic = 'force-dynamic';

function PopularSectionSkeleton() {
  return (
    <section className="relative py-[var(--spacing-20)] px-[var(--spacing-container-padding)] md:px-[var(--spacing-container-padding-tablet)] lg:px-[var(--spacing-container-padding-desktop)] pb-[var(--spacing-20)] overflow-hidden">
      <div className="relative">
        <div className="text-center mb-[var(--spacing-16)]">
          <div className="flex items-center justify-center gap-3 mb-[var(--spacing-4)]">
            <div className="w-3 h-3 bg-[var(--color-brand-secondary)] rounded-full animate-pulse" />
            <h2 className="text-heading-2 md:text-heading-1 text-[--color-text-primary] font-bold">
              인기 콘텐츠
            </h2>
            <div className="w-3 h-3 bg-[var(--color-brand-primary)] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[var(--color-border-primary)] p-4 bg-[var(--color-background-primary)] animate-pulse shadow-lg"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-[var(--color-gray-100)] to-[var(--color-gray-200)]" />
              <div className="h-6 mt-4 bg-gradient-to-r from-[var(--color-gray-100)] to-[var(--color-gray-200)] rounded-lg w-3/4" />
              <div className="h-4 mt-2 bg-gradient-to-r from-[var(--color-gray-100)] to-[var(--color-gray-200)] rounded-lg w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="mx-auto max-w-screen-2xl px-[var(--spacing-container-padding)] md:px-[var(--spacing-container-padding-tablet)] lg:px-[var(--spacing-container-padding-desktop)]">
      <ServiceMainHero />
      <CategorySection />
      <Suspense fallback={<PopularSectionSkeleton />}>
        <PopularSection />
      </Suspense>
    </main>
  );
}
