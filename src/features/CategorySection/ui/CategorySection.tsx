import { categories } from '../model/constants';
import { useState } from 'react';
import { CategoryModal } from '@/features/Modal/ui/CategoryModal';

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
            className="group relative rounded-2xl p-[1px] overflow-hidden bg-[linear-gradient(135deg,rgba(168,100,162,0.28),rgba(168,100,162,0.08)_40%,rgba(255,255,255,0)_60%)] transition-all duration-200 hover:bg-[linear-gradient(135deg,rgba(168,100,162,0.36),rgba(168,100,162,0.14)_40%,rgba(255,255,255,0)_60%)] shadow-[var(--shadow-button)] hover:shadow-[0_6px_18px_-6px_rgba(168,100,162,0.35)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-brand-secondary] focus-visible:ring-offset-2 focus-visible:ring-offset-[--color-background-primary] text-left"
          >
            <div className="rounded-[calc(theme(borderRadius.2xl)-2px)] bg-[--color-background-primary] p-6 border border-[rgba(168,100,162,0.18)] group-hover:border-[rgba(168,100,162,0.28)] transition-colors">
              <h3 className="text-heading-5 text-[--color-text-primary] mb-1">{category.title}</h3>
              <p className="text-body-small text-[--color-text-secondary]">{category.desc}</p>
            </div>
          </button>
        ))}
      </section>

      {selectedCategory && (
        <CategoryModal
          isOpen={!!selectedCategory}
          onClose={handleCloseModal}
          category={selectedCategory.category}
          categoryTitle={selectedCategory.title}
        />
      )}
    </>
  );
}
