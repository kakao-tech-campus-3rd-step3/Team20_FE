'use client';

import { categories } from '../../model/constants';
import { Suspense, useState } from 'react';
import { CategoryModal } from '@/features/Modal/ui/CategoryModal';
import { Modal } from '@/features/Modal/ui/Modal';

export function CategorySection() {
  const [selectedCategory, setSelectedCategory] = useState<{
    category: string;
    title: string;
  } | null>(null);

  const handleCategoryClick = (category: string, title: string) => {
    setSelectedCategory({ category, title });
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

  return (
    <>
      <section className="relative py-[var(--spacing-20)] px-[var(--spacing-container-padding)] md:px-[var(--spacing-container-padding-tablet)] lg:px-[var(--spacing-container-padding-desktop)] pb-[var(--spacing-20)]">
        {/* 섹션 헤더 */}
        <div className="text-center mb-[var(--spacing-16)]">
          <h2 className="text-heading-2 md:text-heading-1 text-[--color-text-primary] font-bold mb-[var(--spacing-4)]">
            카테고리별 탐색
          </h2>
          <p className="text-body-large text-[--color-text-secondary] max-w-2xl mx-auto">
            다양한 장르와 테마로 나누어진 콘텐츠를 탐색해보세요
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-[var(--color-brand-secondary)] to-[var(--color-brand-primary)] rounded-full mx-auto mt-[var(--spacing-4)]" />
        </div>

        {/* 카테고리 그리드 */}
        <div className="grid gap-8 md:grid-cols-3 lg:gap-10">
          {categories.map((category, index) => (
            <button
              key={category.href}
              onClick={() => handleCategoryClick(category.key, category.title)}
              className="group relative rounded-3xl p-[2px] overflow-hidden bg-[linear-gradient(135deg,rgba(var(--color-brand-secondary-rgb)/0.3),rgba(var(--color-brand-primary-rgb)/0.15)_50%,rgba(var(--color-brand-secondary-rgb)/0.1)_100%)] transition-all duration-300 hover:bg-[linear-gradient(135deg,rgba(var(--color-brand-secondary-rgb)/0.4),rgba(var(--color-brand-primary-rgb)/0.25)_50%,rgba(var(--color-brand-secondary-rgb)/0.2)_100%)] shadow-lg hover:shadow-2xl hover:-translate-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-brand-secondary] focus-visible:ring-offset-2 focus-visible:ring-offset-[--color-background-primary] text-left"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="rounded-[calc(theme(borderRadius.3xl)-2px)] bg-[--color-background-primary] p-8 border border-[rgba(var(--color-brand-secondary-rgb)/0.2)] group-hover:border-[rgba(var(--color-brand-secondary-rgb)/0.35)] transition-all duration-300 relative overflow-hidden">
                {/* 카드 내부 배경 효과 */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  {/* 카테고리 아이콘 영역 */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-brand-secondary)]/20 to-[var(--color-brand-primary)]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-brand-secondary)]/30 group-hover:bg-[var(--color-brand-secondary)]/50 transition-colors duration-300" />
                  </div>

                  <h3 className="text-heading-4 md:text-heading-3 text-[--color-text-primary] mb-3 font-semibold group-hover:text-[var(--color-brand-secondary)] transition-colors duration-300">
                    {category.title}
                  </h3>

                  {/* 호버 시 표시되는 화살표 */}
                  <div className="mt-6 flex items-center text-[var(--color-brand-secondary)] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                    <span className="text-sm font-medium mr-2">자세히 보기</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {selectedCategory && (
        <Suspense
          fallback={
            <Modal
              isOpen={!!selectedCategory}
              onClose={handleCloseModal}
              title={selectedCategory.title}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 animate-pulse">
                {Array.from({ length: 10 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-36 rounded-xl bg-[rgba(var(--color-brand-secondary-rgb)/0.12)]"
                  />
                ))}
              </div>
            </Modal>
          }
        >
          <CategoryModal
            isOpen={!!selectedCategory}
            onClose={handleCloseModal}
            category={selectedCategory.category}
            categoryTitle={selectedCategory.title}
          />
        </Suspense>
      )}
    </>
  );
}
