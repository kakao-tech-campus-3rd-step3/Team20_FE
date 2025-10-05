import { useState } from 'react';

export interface CategoryState {
  category: string;
  title: string;
}

export function useCategoryModal() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryState | null>(null);

  // Footer 카테고리를 CategorySection과 동일한 key로 매핑
  const getCategoryKey = (label: string) => {
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

  const handleCategoryClick = (category: string, title: string) => {
    setSelectedCategory({ category, title });
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

  return {
    selectedCategory,
    getCategoryKey,
    handleCategoryClick,
    handleCloseModal,
  };
}
