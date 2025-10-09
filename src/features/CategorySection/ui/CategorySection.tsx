import { categories } from '../model/constants';
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
      <section className="grid gap-6 md:grid-cols-3 px-[var(--spacing-container-padding)] md:px-[var(--spacing-container-padding-tablet)] lg:px-[var(--spacing-container-padding-desktop)] pb-[var(--spacing-16)]">
        {categories.map((category) => (
          <button
            key={category.href}
            onClick={() => handleCategoryClick(category.key, category.title)}
            className="group relative rounded-2xl p-[1px] overflow-hidden bg-[linear-gradient(135deg,rgba(var(--color-brand-secondary-rgb)/0.28),rgba(var(--color-brand-secondary-rgb)/0.08)_40%,rgba(255,255,255,0)_60%)] transition-all duration-200 hover:bg-[linear-gradient(135deg,rgba(var(--color-brand-secondary-rgb)/0.36),rgba(var(--color-brand-secondary-rgb)/0.14)_40%,rgba(255,255,255,0)_60%)] shadow-[var(--shadow-button)] hover:shadow-[0_6px_18px_-6px_rgba(var(--color-brand-secondary-rgb)/0.35)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-brand-secondary] focus-visible:ring-offset-2 focus-visible:ring-offset-[--color-background-primary] text-left"
          >
            <div className="rounded-[calc(theme(borderRadius.2xl)-2px)] bg-[--color-background-primary] p-6 border border-[rgba(var(--color-brand-secondary-rgb)/0.18)] group-hover:border-[rgba(var(--color-brand-secondary-rgb)/0.28)] transition-colors">
              <h3 className="text-heading-5 text-[--color-text-primary] mb-1">{category.title}</h3>
              <p className="text-body-small text-[--color-text-secondary]">{category.desc}</p>
            </div>
          </button>
        ))}
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
