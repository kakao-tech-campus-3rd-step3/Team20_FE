import { Suspense, lazy } from 'react';
import { ServiceMainHero } from '@/features/ServiceMainHero';
import type { Metadata } from 'next';

// 지연 로딩으로 Critical CSS 최적화
const CategorySection = lazy(() => 
  import('@/features/CategorySection').then(module => ({ 
    default: module.CategorySection 
  }))
);

const PopularSection = lazy(() => 
  import('@/features/PopularSection').then(module => ({ 
    default: module.PopularSection 
  }))
);

export const metadata: Metadata = {
  title: 'K-SPOT - K-콘텐츠 여행의 모든 것',
  description: '좋아하는 드라마, 영화, K-POP의 촬영지를 찾아 떠나는 특별한 여행. K-SPOT에서 나만의 K-콘텐츠 여행을 계획해보세요.',
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
    <main className="mx-auto max-w-screen-2xl container-padding-stable">
      <ServiceMainHero />
      <Suspense fallback={
        <section className="grid gap-6 md:grid-cols-3 px-[var(--spacing-container-padding)] md:px-[var(--spacing-container-padding-tablet)] lg:px-[var(--spacing-container-padding-desktop)]">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[--color-border-primary] bg-[--color-background-primary] p-6 shadow-[var(--shadow-button)] animate-pulse"
            >
              <div className="h-6 bg-gradient-to-r from-[var(--color-gray-100)] to-[var(--color-gray-200)] rounded w-3/4 mb-2" />
              <div className="h-4 bg-gradient-to-r from-[var(--color-gray-100)] to-[var(--color-gray-200)] rounded w-full" />
            </div>
          ))}
        </section>
      }>
        <CategorySection />
      </Suspense>
      <Suspense fallback={
        <section className="relative py-[var(--spacing-20)] px-[var(--spacing-container-padding)] md:px-[var(--spacing-container-padding-tablet)] lg:px-[var(--spacing-container-padding-desktop)] pb-[var(--spacing-20)] overflow-hidden">
          <div className="text-center mb-[var(--spacing-16)]">
            <h2 className="text-heading-2 md:text-heading-1 text-[--color-text-primary] font-bold">
              인기 콘텐츠 로딩 중...
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[var(--color-border-primary)] p-4 bg-[var(--color-background-primary)] animate-pulse shadow-lg"
              >
                <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-[var(--color-gray-100)] to-[var(--color-gray-200)]" />
                <div className="h-6 mt-4 bg-gradient-to-r from-[var(--color-gray-100)] to-[var(--color-gray-200)] rounded-lg w-3/4" />
                <div className="h-4 mt-2 bg-gradient-to-r from-[var(--color-gray-100)] to-[var(--color-gray-200)] rounded-lg w-1/2" />
              </div>
            ))}
          </div>
        </section>
      }>
        <PopularSection />
      </Suspense>
    </main>
  );
}