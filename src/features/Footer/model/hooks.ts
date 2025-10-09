import { useState } from 'react';

export interface CategoryState {
  category: string;
  title: string;
}

// Footer 카테고리를 CategorySection과 동일한 key로 매핑하는 순수 함수
export const getCategoryKey = (label: string) => {
  switch (label) {
    case 'K-Drama':
      return 'drama';
    case 'K-Movie':
      return 'movie';
    case 'K-POP':
      return 'pop';
    default:
      return label.toLowerCase();
  }
};

export function useCategoryModal() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryState | null>(null);

  const handleCategoryClick = (category: string, title: string) => {
    setSelectedCategory({ category, title });
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

  return {
    selectedCategory,
    handleCategoryClick,
    handleCloseModal,
  };
}
