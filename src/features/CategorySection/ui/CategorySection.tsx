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

  const getCategoryKey = (href: string) => {
    if (href.includes('k-drama')) return 'drama';
    if (href.includes('k-movie')) return 'movie';
    if (href.includes('k-pop')) return 'pop';
    return 'movie';
  };

  return (
    <>
      <section className="grid gap-6 md:grid-cols-3 px-[var(--spacing-container-padding)] md:px-[var(--spacing-container-padding-tablet)] lg:px-[var(--spacing-container-padding-desktop)]">
        {categories.map((category) => (
          <button
            key={category.href}
            onClick={() => handleCategoryClick(getCategoryKey(category.href), category.title)}
            className="group rounded-2xl border border-[--color-border-primary] bg-[--color-background-primary] p-6 shadow-[var(--shadow-button)] transition-all duration-200 hover:shadow-[var(--shadow-card)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-border-focus] text-left"
          >
            <h3 className="text-heading-5 text-[--color-text-primary] mb-1">{category.title}</h3>
            <p className="text-body-small text-[--color-text-secondary]">{category.desc}</p>
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
