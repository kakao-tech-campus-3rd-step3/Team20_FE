import { FOOTER_CATEGORIES } from '../../model/constants';
import { FOOTER_TITLES } from '../../model/messages';
import { useCategoryModal } from '../../model/hooks';
import { CategoryModal } from '@/features/Modal/ui/CategoryModal';

export function FooterContentCategories() {
  const { selectedCategory, getCategoryKey, handleCategoryClick, handleCloseModal } =
    useCategoryModal();

  return (
    <>
      <div className="flex flex-col gap-(--spacing-4)">
        <h3 className="text-heading-4 text-(--color-text-inverse)">{FOOTER_TITLES.CATEGORIES}</h3>
        <ul className="flex flex-col gap-(--spacing-3)">
          {FOOTER_CATEGORIES.map((cat) => (
            <li key={cat.label}>
              <button
                onClick={() => handleCategoryClick(getCategoryKey(cat.label), cat.label)}
                className="block text-(--color-text-secondary) transition-colors duration-200 hover:text-(--color-text-inverse)
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/60 focus-visible:ring-offset-2
                          text-left w-full"
              >
                <span className="text-body-small font-medium">{cat.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

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
