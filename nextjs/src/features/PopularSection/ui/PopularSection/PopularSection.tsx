import { messages } from '../../model/messages';
import { PosterCard } from '../PosterCard/PosterCard';
import { getPopularContentsCached } from '@/entities/content/api/contentApi';

export async function PopularSection() {
  const data = await getPopularContentsCached();

  return (
    <section className="relative py-[var(--spacing-20)] px-[var(--spacing-container-padding)] md:px-[var(--spacing-container-padding-tablet)] lg:px-[var(--spacing-container-padding-desktop)] pb-[var(--spacing-20)] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-primary)]/3 via-transparent to-[var(--color-brand-secondary)]/5 pointer-events-none" />

      <div className="relative">
        <div className="text-center mb-[var(--spacing-16)]">
          <div className="flex items-center justify-center gap-3 mb-[var(--spacing-4)]">
            <div className="w-3 h-3 bg-[var(--color-brand-secondary)] rounded-full animate-pulse" />
            <h2 className="text-heading-2 md:text-heading-1 text-[--color-text-primary] font-bold">
              {messages.popularNow}
            </h2>
            <div
              className="w-3 h-3 bg-[var(--color-brand-primary)] rounded-full animate-pulse"
              style={{ animationDelay: '0.5s' }}
            />
          </div>
          <p className="text-body-large text-[--color-text-secondary] max-w-2xl mx-auto">
            지금 가장 인기 있는 드라마와 영화를 만나보세요
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[var(--color-brand-secondary)] to-[var(--color-brand-primary)] rounded-full mx-auto mt-[var(--spacing-4)]" />
        </div>

        {data.length === 0 ? (
          <div className="text-center py-[var(--spacing-16)]">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-brand-primary)]/10 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[var(--color-brand-primary)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <p className="text-[var(--color-text-secondary)] text-lg">
              표시할 인기 콘텐츠가 없어요.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((content, index) => (
              <div
                key={content.contentId}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PosterCard {...content} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}